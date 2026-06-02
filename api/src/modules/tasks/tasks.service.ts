import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TASK_STATUS } from 'src/common/enums/task-status.enum';
import { GetTasksQueryDto } from './dtos/get-tasks-query.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private async ensureUserExists(userId: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException({ message: 'User not found' });
    }
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    await this.ensureUserExists(dto.user_id);

    const status = dto.status ?? TASK_STATUS.TODO;
    if (status === TASK_STATUS.CANCELED && !dto.cancel_reason) {
      throw new BadRequestException({
        message: 'cancel_reason is required when status is CANCELED',
      });
    }

    const task = this.taskRepository.create({
      user_id: dto.user_id,
      title: dto.title.trim(),
      description: dto.description?.trim() ?? null,
      priority: dto.priority,
      status,
      task_date: dto.task_date,
      cancel_reason: dto.cancel_reason ?? null,
      cancel_description: dto.cancel_description?.trim() ?? null,
      sort_order: dto.sort_order ?? 0,
      total_time_seconds: dto.total_time_seconds ?? 0,
      completed_at: status === TASK_STATUS.DONE ? new Date() : null,
    });

    return this.taskRepository.save(task);
  }

  async findAllForUser(query: GetTasksQueryDto): Promise<Task[]> {
    await this.ensureUserExists(query.user_id);

    const qb = this.taskRepository
      .createQueryBuilder('t')
      .where('t.user_id = :userId', { userId: query.user_id })
      .orderBy('t.sort_order', 'ASC')
      .addOrderBy('t.created_at', 'ASC');

    if (query.task_date) {
      qb.andWhere('t.task_date = :taskDate', { taskDate: query.task_date });
    }

    return qb.getMany();
  }

  async findOneForUser(id: string, userId: string): Promise<Task> {
    await this.ensureUserExists(userId);

    const task = await this.taskRepository.findOne({
      where: { id, user_id: userId },
    });
    if (!task) {
      throw new NotFoundException({ message: 'Task not found' });
    }
    return task;
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.findOneForUser(id, userId);

    const nextStatus = dto.status ?? task.status;
    if (nextStatus === TASK_STATUS.CANCELED) {
      const reason = dto.cancel_reason ?? task.cancel_reason;
      if (!reason) {
        throw new BadRequestException({
          message: 'cancel_reason is required when status is CANCELED',
        });
      }
    }

    if (dto.title !== undefined) task.title = dto.title.trim();
    if (dto.description !== undefined) {
      task.description = dto.description === null ? null : dto.description.trim();
    }
    if (dto.priority !== undefined) task.priority = dto.priority;
    if (dto.task_date !== undefined) task.task_date = dto.task_date;
    if (dto.sort_order !== undefined) task.sort_order = dto.sort_order;
    if (dto.total_time_seconds !== undefined) {
      task.total_time_seconds = dto.total_time_seconds;
    }
    if (dto.cancel_reason !== undefined) {
      task.cancel_reason = dto.cancel_reason;
    }
    if (dto.cancel_description !== undefined) {
      task.cancel_description =
        dto.cancel_description === null
          ? null
          : dto.cancel_description.trim();
    }

    if (dto.status !== undefined) {
      task.status = dto.status;
      if (dto.status === TASK_STATUS.DONE) {
        task.completed_at = new Date();
      } else {
        task.completed_at = null;
      }
    }

    return this.taskRepository.save(task);
  }

  async remove(id: string, userId: string): Promise<void> {
    const task = await this.findOneForUser(id, userId);
    await this.taskRepository.softRemove(task);
  }
}
