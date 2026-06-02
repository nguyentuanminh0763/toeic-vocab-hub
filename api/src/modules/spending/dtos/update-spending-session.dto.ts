import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateSpendingSessionDto {
  @ApiPropertyOptional({ example: true, description: 'Đã xác nhận buổi chi tiêu' })
  @IsOptional()
  @IsBoolean()
  confirmed?: boolean;

  @ApiPropertyOptional({ example: false, description: 'Không chi tiêu buổi này' })
  @IsOptional()
  @IsBoolean()
  is_no_spend?: boolean;
}