import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SWAGGER_EXAMPLE_DATETIME, SWAGGER_EXAMPLE_UUID } from 'src/common/swagger-examples';
import { User } from 'src/modules/users/entities/user.entity';
import { TASK_PRIORITY, TASK_PRIORITIES, type TaskPriority } from 'src/common/enums/task-priority.enum';
import { TASK_STATUS, TASK_STATUSES, type TaskStatus } from 'src/common/enums/task-status.enum';
import { CANCEL_REASON, CANCEL_REASONS, type CancelReason } from 'src/common/enums/cancel-reason.enum';

@Entity('tasks')
@Index('idx_tasks_user_id_task_date', ['user_id', 'task_date'])
export class Task {
  @ApiProperty({ format: 'uuid', example: SWAGGER_EXAMPLE_UUID })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ format: 'uuid', example: SWAGGER_EXAMPLE_UUID })
  @Column({ type: 'uuid' })
  user_id: string;

  @ApiHideProperty()
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({ example: 'Hoàn thành báo cáo' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiPropertyOptional({ example: 'Chi tiết công việc cần làm', nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string | null;

  @ApiProperty({
    enum: TASK_PRIORITIES,
    default: TASK_PRIORITY.MEDIUM,
    example: TASK_PRIORITY.MEDIUM,
  })
  @Column({
    type: 'varchar',
    length: 16,
    default: TASK_PRIORITY.MEDIUM,
  })
  priority: TaskPriority;

  @ApiProperty({
    enum: TASK_STATUSES,
    default: TASK_STATUS.TODO,
    example: TASK_STATUS.TODO,
  })
  @Column({
    type: 'varchar',
    length: 16,
    default: TASK_STATUS.TODO,
  })
  status: TaskStatus;

  @ApiProperty({ example: '2026-04-03', description: 'Ngày gán task (YYYY-MM-DD)' })
  @Column({ type: 'date' })
  task_date: string;

  @ApiPropertyOptional({
    enum: CANCEL_REASONS,
    example: CANCEL_REASON.OTHER,
    nullable: true,
  })
  @Column({ type: 'varchar', length: 32, nullable: true })
  cancel_reason: CancelReason | null;

  @ApiPropertyOptional({ example: 'Đổi ưu tiên sprint', nullable: true })
  @Column({ type: 'text', nullable: true })
  cancel_description: string | null;

  @ApiPropertyOptional({
    type: String,
    format: 'date-time',
    example: SWAGGER_EXAMPLE_DATETIME,
    nullable: true,
  })
  @Column({ type: 'timestamptz', nullable: true })
  completed_at: Date | null;

  @ApiProperty({ default: 0, example: 0, description: 'Thứ tự hiển thị trong ngày' })
  @Column({ type: 'int', default: 0 })
  sort_order: number;

  @ApiProperty({ default: 0, example: 3600, description: 'Tổng thời gian làm việc (giây)' })
  @Column({ type: 'int', default: 0 })
  total_time_seconds: number;

  @ApiProperty({ type: String, format: 'date-time', example: SWAGGER_EXAMPLE_DATETIME })
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @ApiProperty({ type: String, format: 'date-time', example: SWAGGER_EXAMPLE_DATETIME })
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @ApiPropertyOptional({
    type: String,
    format: 'date-time',
    example: SWAGGER_EXAMPLE_DATETIME,
    nullable: true,
  })
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at: Date | null;
}
