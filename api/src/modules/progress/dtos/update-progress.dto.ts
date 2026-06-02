import { IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Body DTO — user_id lấy từ JWT, không cần truyền vào body
export class UpdateProgressBodyDto {
  @ApiProperty({ enum: ['ok', 'hard', 'unseen'] })
  @IsIn(['ok', 'hard', 'unseen'])
  status: 'ok' | 'hard' | 'unseen';
}

// Giữ lại để không break import cũ nếu có
export class UpdateProgressDto extends UpdateProgressBodyDto {}
