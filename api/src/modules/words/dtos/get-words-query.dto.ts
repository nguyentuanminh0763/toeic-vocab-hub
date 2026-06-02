import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetWordsQueryDto {
  @ApiPropertyOptional({ example: 'ETS_2026_TEST1', description: 'Lọc theo bộ từ vựng' })
  @IsOptional()
  @IsString()
  set?: string;
}
