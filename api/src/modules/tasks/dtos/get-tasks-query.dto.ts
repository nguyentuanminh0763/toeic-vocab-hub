import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SWAGGER_EXAMPLE_UUID } from 'src/common/swagger-examples';
import { IsOptional, IsUUID, Matches } from 'class-validator';

export class GetTasksQueryDto {
  @ApiProperty({
    format: 'uuid',
    example: SWAGGER_EXAMPLE_UUID,
    description: 'Lọc task theo user',
  })
  @IsUUID()
  user_id: string;

  @ApiPropertyOptional({ example: '2026-04-03', description: 'YYYY-MM-DD' })
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'task_date must be YYYY-MM-DD',
  })
  task_date?: string;
}