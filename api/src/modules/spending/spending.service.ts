import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Category } from './entities/category.entity';
import { SpendingSession } from './entities/spending-session.entity';
import { Expense } from './entities/expense.entity';
import {
  SPENDING_SESSION_ORDER,
  type SpendingSessionName,
} from 'src/common/enums/spending-session.enum';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { UpdateSpendingSessionDto } from './dtos/update-spending-session.dto';

const DEFAULT_CATEGORIES: {
  name: string;
  icon: string;
  color: string;
}[] = [
  { name: 'Ăn uống', icon: '🍜', color: '#f97316' },
  { name: 'Di chuyển', icon: '🚌', color: '#3b82f6' },
  { name: 'Giải trí', icon: '🎮', color: '#a855f7' },
  { name: 'Học tập', icon: '📚', color: '#06b6d4' },
  { name: 'Sinh hoạt', icon: '🏠', color: '#10b981' },
  { name: 'Nợ', icon: '💳', color: '#ef4444' },
  { name: 'Khác', icon: '📦', color: '#6b7280' },
];

export type ExpenseResponse = {
  id: string;
  spending_session_id: string;
  user_id: string;
  category_id: string;
  category_name: string;
  category_icon: string;
  category_color: string;
  amount: number;
  note: string | null;
  created_at: string;
};

export type SpendingSessionResponse = {
  id: string;
  user_id: string;
  session_date: string;
  session: SpendingSessionName;
  is_no_spend: boolean;
  confirmed: boolean;
  expenses: ExpenseResponse[];
  created_at: string;
  updated_at: string;
};

@Injectable()
export class SpendingService implements OnModuleInit {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(SpendingSession)
    private readonly sessionRepo: Repository<SpendingSession>,
    @InjectRepository(Expense)
    private readonly expenseRepo: Repository<Expense>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async onModuleInit(): Promise<void> {
    const n = await this.categoryRepo.count({
      where: { user_id: IsNull() },
    });
    if (n > 0) return;

    for (const row of DEFAULT_CATEGORIES) {
      await this.categoryRepo.save(
        this.categoryRepo.create({
          user_id: null,
          name: row.name,
          icon: row.icon,
          color: row.color,
          is_default: true,
        }),
      );
    }
  }

  private async ensureUserExists(userId: string): Promise<void> {
    const u = await this.userRepo.findOne({ where: { id: userId } });
    if (!u) throw new NotFoundException({ message: 'User not found' });
  }

  async getCategoriesForUser(userId: string): Promise<Category[]> {
    await this.ensureUserExists(userId);
    return this.categoryRepo.find({
      where: [{ user_id: IsNull() }, { user_id: userId }],
      order: { is_default: 'DESC', name: 'ASC' },
    });
  }

  private async ensureDaySessions(
    userId: string,
    sessionDate: string,
  ): Promise<SpendingSession[]> {
    await this.ensureUserExists(userId);

    const existing = await this.sessionRepo.find({
      where: { user_id: userId, session_date: sessionDate },
    });

    const bySlot = new Map(existing.map((s) => [s.session, s]));

    for (const slot of SPENDING_SESSION_ORDER) {
      if (!bySlot.has(slot)) {
        const row = await this.sessionRepo.save(
          this.sessionRepo.create({
            user_id: userId,
            session_date: sessionDate,
            session: slot,
            is_no_spend: false,
            confirmed: false,
          }),
        );
        bySlot.set(slot, row);
      }
    }

    return SPENDING_SESSION_ORDER.map((slot) => bySlot.get(slot)!);
  }

  private mapExpense(e: Expense): ExpenseResponse {
    return {
      id: e.id,
      spending_session_id: e.spending_session_id,
      user_id: e.user_id,
      category_id: e.category_id,
      category_name: e.category.name,
      category_icon: e.category.icon,
      category_color: e.category.color,
      amount: Number(e.amount),
      note: e.note,
      created_at: e.created_at.toISOString(),
    };
  }

  private mapSession(
    s: SpendingSession,
    expenses: Expense[],
  ): SpendingSessionResponse {
    return {
      id: s.id,
      user_id: s.user_id,
      session_date: String(s.session_date).slice(0, 10),
      session: s.session,
      is_no_spend: s.is_no_spend,
      confirmed: s.confirmed,
      expenses: expenses.map((e) => this.mapExpense(e)),
      created_at: s.created_at.toISOString(),
      updated_at: s.updated_at.toISOString(),
    };
  }

  async getDay(
    userId: string,
    sessionDate: string,
  ): Promise<SpendingSessionResponse[]> {
    const sessions = await this.ensureDaySessions(userId, sessionDate);
    const ids = sessions.map((s) => s.id);

    const allExpenses = await this.expenseRepo.find({
      where: { spending_session_id: In(ids) },
      relations: ['category'],
      order: { created_at: 'ASC' },
    });

    const grouped = new Map<string, Expense[]>();
    for (const e of allExpenses) {
      const list = grouped.get(e.spending_session_id) ?? [];
      list.push(e);
      grouped.set(e.spending_session_id, list);
    }

    return sessions.map((s) =>
      this.mapSession(s, grouped.get(s.id) ?? []),
    );
  }

  async updateSession(
    sessionId: string,
    userId: string,
    dto: UpdateSpendingSessionDto,
  ): Promise<SpendingSessionResponse> {
    const session = await this.sessionRepo.findOne({
      where: { id: sessionId, user_id: userId },
    });
    if (!session) {
      throw new NotFoundException({ message: 'Spending session not found' });
    }

    if (dto.is_no_spend === true) {
      const ex = await this.expenseRepo.find({
        where: { spending_session_id: sessionId },
      });
      for (const e of ex) {
        await this.expenseRepo.softRemove(e);
      }
      session.is_no_spend = true;
      session.confirmed = dto.confirmed ?? true;
    } else {
      if (dto.confirmed !== undefined) session.confirmed = dto.confirmed;
      if (dto.is_no_spend === false) session.is_no_spend = false;
    }

    await this.sessionRepo.save(session);

    const expenses = await this.expenseRepo.find({
      where: { spending_session_id: sessionId },
      relations: ['category'],
      order: { created_at: 'ASC' },
    });

    return this.mapSession(session, expenses);
  }

  async createExpense(dto: CreateExpenseDto): Promise<ExpenseResponse> {
    await this.ensureUserExists(dto.user_id);

    const session = await this.sessionRepo.findOne({
      where: { id: dto.spending_session_id, user_id: dto.user_id },
    });
    if (!session) {
      throw new NotFoundException({ message: 'Spending session not found' });
    }

    const category = await this.categoryRepo.findOne({
      where: [
        { id: dto.category_id, user_id: IsNull() },
        { id: dto.category_id, user_id: dto.user_id },
      ],
    });
    if (!category) {
      throw new BadRequestException({ message: 'Invalid category' });
    }

    const expense = this.expenseRepo.create({
      spending_session_id: dto.spending_session_id,
      user_id: dto.user_id,
      category_id: dto.category_id,
      amount: dto.amount.toFixed(2),
      note: dto.note?.trim() ?? null,
    });

    const saved = await this.expenseRepo.save(expense);

    session.is_no_spend = false;
    await this.sessionRepo.save(session);

    const withCat = await this.expenseRepo.findOne({
      where: { id: saved.id },
      relations: ['category'],
    });
    if (!withCat) throw new NotFoundException();
    return this.mapExpense(withCat);
  }

  async removeExpense(expenseId: string, userId: string): Promise<void> {
    const e = await this.expenseRepo.findOne({
      where: { id: expenseId, user_id: userId },
    });
    if (!e) {
      throw new NotFoundException({ message: 'Expense not found' });
    }
    await this.expenseRepo.softRemove(e);
  }
}
