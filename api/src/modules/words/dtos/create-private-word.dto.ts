import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePrivateWordDto {
  @ApiProperty({ example: 'eloquent' })
  @IsString() @IsNotEmpty() @MaxLength(255)
  word: string;

  @ApiProperty({ example: 'hùng hồn, lưu loát' })
  @IsString() @IsNotEmpty() @MaxLength(500)
  meaning: string;

  @ApiPropertyOptional({ example: 'ETS_2026_TEST1' })
  @IsOptional() @IsString() @MaxLength(64)
  set_name?: string;

  @ApiPropertyOptional({ example: 'adjective' })
  @IsOptional() @IsString() @MaxLength(64)
  word_form?: string;

  @ApiPropertyOptional({ example: '/ˈel.ə.kwənt/' })
  @IsOptional() @IsString() @MaxLength(255)
  ipa?: string;

  @ApiPropertyOptional({ example: 'She gave an eloquent speech.' })
  @IsOptional() @IsString()
  example?: string;
}
