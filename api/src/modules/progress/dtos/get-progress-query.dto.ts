import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetProgressQueryDto {
  @ApiProperty({ format: 'uuid', description: 'User ID' })
  @IsUUID()
  user_id: string;
}
