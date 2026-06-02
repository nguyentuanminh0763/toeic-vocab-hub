import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  Matches,
} from 'class-validator';
import {
  TASK_PRIORITY,
  TASK_PRIORITIES,
  type TaskPriority,
} from 'src/common/enums/task-priority.enum';
import { TASK_STATUS, TASK_STATUSES, type TaskStatus } from 'src/common/enums/task-status.enum';
import {
  CANCEL_REASON,
  CANCEL_REASONS,
  type CancelReason,
} from 'src/common/enums/cancel-reason.enum';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Hoàn thành báo cáo', maxLength: 255 })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  title?: string;

  @ApiPropertyOptional({ example: 'Cập nhật mô tả', nullable: true })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiPropertyOptional({ enum: TASK_PRIORITIES, example: TASK_PRIORITY.HIGH })
  @IsOptional()
  @IsEnum(TASK_PRIORITY)
  priority?: TaskPriority;

  @ApiPropertyOptional({ enum: TASK_STATUSES, example: TASK_STATUS.IN_PROGRESS })
  @IsOptional()
  @IsEnum(TASK_STATUS)
  status?: TaskStatus;

  @ApiPropertyOptional({ example: '2026-04-03', description: 'YYYY-MM-DD' })
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'task_date must be YYYY-MM-DD',
  })
  task_date?: string;

  @ApiPropertyOptional({ enum: CANCEL_REASONS, example: CANCEL_REASON.NOT_NEEDED, nullable: true })
  @IsOptional()
  @IsEnum(CANCEL_REASON)
  cancel_reason?: CancelReason | null;

  @ApiPropertyOptional({ example: 'Không còn trong backlog', nullable: true })
  @IsOptional()
  @IsString()
  cancel_description?: string | null;

  @ApiPropertyOptional({ example: 1, minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  sort_order?: number;

  @ApiPropertyOptional({ example: 7200, minimum: 0, maximum: 86400 * 365 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(86400 * 365)
  total_time_seconds?: number;
}
