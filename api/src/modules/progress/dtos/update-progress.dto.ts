import { IsUUID, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProgressDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  user_id: string;

  @ApiProperty({ enum: ['ok', 'hard', 'unseen'] })
  @IsIn(['ok', 'hard', 'unseen'])
  status: 'ok' | 'hard' | 'unseen';
}
