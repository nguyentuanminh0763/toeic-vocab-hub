import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsEnum,
} from 'class-validator';
import { USER_ROLE, USER_ROLES, type UserRole } from 'src/common/enums/user-role.enum';
import { USER_STATUS, USER_STATUSES, type UserStatus } from 'src/common/enums/user-status.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongPass123!' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string; // server sẽ hash sang password_hash

  @ApiPropertyOptional({ example: 'Nguyễn Văn A' })
  @IsOptional()
  @IsString()
  full_name?: string;

  @ApiPropertyOptional({ example: '0912345678' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.png' })
  @IsOptional()
  @IsString()
  avatar_url?: string;

  @ApiPropertyOptional({
    enum: USER_ROLES,
    default: USER_ROLE.USER,
    example: USER_ROLE.USER,
  })
  @IsOptional()
  @IsEnum(USER_ROLE)
  role?: UserRole;

  @ApiPropertyOptional({
    enum: USER_STATUSES,
    default: USER_STATUS.ACTIVE,
    example: USER_STATUS.ACTIVE,
  })
  @IsOptional()
  @IsEnum(USER_STATUS)
  status?: UserStatus;
}
