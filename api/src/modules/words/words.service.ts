import { ForbiddenException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word } from './entities/word.entity';
import { SEED_SETS } from './seed-data';
import { CreatePrivateWordDto } from './dtos/create-private-word.dto';

@Injectable()
export class WordsService implements OnModuleInit {
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
  ) {}

  async onModuleInit() {
    for (const { set_name, words } of SEED_SETS) {
      const count = await this.wordRepository.count({
        where: { set_name, visibility: 'public' },
      });
      if (count === 0) {
        const entities = words.map((w) =>
          this.wordRepository.create({ ...w, set_name, visibility: 'public' }),
        );
        await this.wordRepository.save(entities);
      }
    }
  }

  async findAll(set?: string, userId?: string): Promise<Word[]> {
    const qb = this.wordRepository
      .createQueryBuilder('w')
      .orderBy('w.sort_order', 'ASC')
      .addOrderBy('w.created_at', 'ASC');

    if (userId) {
      qb.where(
        "(w.visibility = 'public' OR (w.visibility = 'private' AND w.user_id = :userId))",
        { userId },
      );
    } else {
      qb.where("w.visibility = 'public'");
    }

    if (set) qb.andWhere('w.set_name = :set', { set });

    return qb.getMany();
  }

  async findOne(id: string): Promise<Word> {
    const word = await this.wordRepository.findOne({ where: { id } });
    if (!word) throw new NotFoundException(`Word ${id} not found`);
    return word;
  }

  async createPrivate(userId: string, dto: CreatePrivateWordDto): Promise<Word> {
    const setName = dto.set_name ?? 'ETS_2026_TEST1';

    // Place private words after system words (sort_order 10000+)
    const result = await this.wordRepository
      .createQueryBuilder('w')
      .select('MAX(w.sort_order)', 'max')
      .where("w.visibility = 'private' AND w.user_id = :userId AND w.set_name = :setName", {
        userId,
        setName,
      })
      .getRawOne<{ max: number | null }>();

    const nextOrder = Math.max((result?.max ?? 9999) + 1, 10000);

    const word = this.wordRepository.create({
      word: dto.word,
      meaning: dto.meaning,
      word_form: dto.word_form ?? 'noun',
      ipa: dto.ipa ?? '',
      example: dto.example ?? '',
      set_name: setName,
      visibility: 'private',
      user_id: userId,
      sort_order: nextOrder,
    });

    return this.wordRepository.save(word);
  }

  async removePrivate(userId: string, wordId: string): Promise<void> {
    const word = await this.wordRepository.findOne({ where: { id: wordId } });
    if (!word) throw new NotFoundException(`Word ${wordId} not found`);
    if (word.visibility !== 'private' || word.user_id !== userId) {
      throw new ForbiddenException('Chỉ được xóa từ vựng riêng của bạn');
    }
    await this.wordRepository.remove(word);
  }
}
