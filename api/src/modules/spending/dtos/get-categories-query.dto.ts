import { ApiProperty } from '@nestjs/swagger';
import { SWAGGER_EXAMPLE_UUID } from 'src/common/swagger-examples';
import { IsUUID } from 'class-validator';

export class GetCategoriesQueryDto {
  @ApiProperty({ format: 'uuid', example: SWAGGER_EXAMPLE_UUID })
  @IsUUID()
  user_id: string;
}