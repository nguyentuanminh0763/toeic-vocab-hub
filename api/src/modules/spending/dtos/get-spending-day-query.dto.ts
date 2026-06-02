import { ApiProperty } from '@nestjs/swagger';
import { SWAGGER_EXAMPLE_UUID } from 'src/common/swagger-examples';
import { IsUUID, Matches } from 'class-validator';

export class GetSpendingDayQueryDto {
  @ApiProperty({ format: 'uuid', example: SWAGGER_EXAMPLE_UUID })
  @IsUUID()
  user_id: string;

  @ApiProperty({ example: '2026-04-03', description: 'YYYY-MM-DD' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'session_date must be YYYY-MM-DD',
  })
  session_date: string;
}