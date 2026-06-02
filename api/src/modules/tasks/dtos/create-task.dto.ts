import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SWAGGER_EXAMPLE_UUID } from 'src/common/swagger-examples';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
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

export class CreateTaskDto {
  @ApiProperty({ format: 'uuid', example: SWAGGER_EXAMPLE_UUID })
  @IsUUID()
  user_id: string;

  @ApiProperty({ example: 'Hoàn thành báo cáo', maxLength: 255 })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional({ example: 'Mô tả chi tiết công việc', nullable: true })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiProperty({
    enum: TASK_PRIORITIES,
    default: TASK_PRIORITY.MEDIUM,
    example: TASK_PRIORITY.MEDIUM,
  })
  @IsEnum(TASK_PRIORITY)
  priority: TaskPriority;

  @ApiPropertyOptional({
    enum: TASK_STATUSES,
    default: TASK_STATUS.TODO,
    example: TASK_STATUS.TODO,
  })
  @IsOptional()
  @IsEnum(TASK_STATUS)
  status?: TaskStatus;

  @ApiProperty({ example: '2026-04-03', description: 'YYYY-MM-DD' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'task_date must be YYYY-MM-DD',
  })
  task_date: string;

  @ApiPropertyOptional({
    enum: CANCEL_REASONS,
    example: CANCEL_REASON.OTHER,
    nullable: true,
  })
  @IsOptional()
  @IsEnum(CANCEL_REASON)
  cancel_reason?: CancelReason | null;

  @ApiPropertyOptional({ example: 'Lý do hủy / hủy scope', nullable: true })
  @IsOptional()
  @IsString()
  cancel_description?: string | null;

  @ApiPropertyOptional({ default: 0, example: 0, minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  sort_order?: number;

  @ApiPropertyOptional({ default: 0, example: 3600, minimum: 0, maximum: 86400 * 365 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(86400 * 365)
  total_time_seconds?: number;
}
