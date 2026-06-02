import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SWAGGER_EXAMPLE_UUID, SWAGGER_EXAMPLE_UUID_B } from 'src/common/swagger-examples';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ format: 'uuid', example: SWAGGER_EXAMPLE_UUID })
  @IsUUID()
  user_id: string;

  @ApiProperty({ format: 'uuid', example: SWAGGER_EXAMPLE_UUID_B })
  @IsUUID()
  spending_session_id: string;

  @ApiProperty({ format: 'uuid', example: SWAGGER_EXAMPLE_UUID_B })
  @IsUUID()
  category_id: string;

  @ApiProperty({ example: 50000, minimum: 0.01, maximum: 9999999999.99 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @Max(9999999999.99)
  amount: number;

  @ApiPropertyOptional({ example: 'Cơm trưa', maxLength: 500, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string | null;
}