import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SWAGGER_EXAMPLE_DATETIME, SWAGGER_EXAMPLE_UUID } from 'src/common/swagger-examples';
import { USER_ROLE, USER_ROLES, type UserRole } from 'src/common/enums/user-role.enum';
import { USER_STATUS, USER_STATUSES, type UserStatus } from 'src/common/enums/user-status.enum';

@Entity('users')
@Index('idx_users_email_unique', ['email'], { unique: true })
export class User {
  @ApiProperty({ format: 'uuid', example: SWAGGER_EXAMPLE_UUID })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @ApiHideProperty()
  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password_hash: string;

  @ApiPropertyOptional({ example: 'Nguyễn Văn A', nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  full_name?: string | null;

  @ApiPropertyOptional({ example: '0912345678', nullable: true })
  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string | null;

  @ApiPropertyOptional({
    example: 'https://cdn.example.com/avatars/1.png',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 512, nullable: true })
  avatar_url?: string | null;

  @ApiProperty({
    enum: USER_ROLES,
    default: USER_ROLE.USER,
    example: USER_ROLE.USER,
  })
  @Column({
    type: 'varchar',
    length: 16,
    default: USER_ROLE.USER,
  })
  role: UserRole;

  @ApiProperty({
    enum: USER_STATUSES,
    default: USER_STATUS.ACTIVE,
    example: USER_STATUS.ACTIVE,
  })
  @Column({
    type: 'varchar',
    length: 16,
    default: USER_STATUS.ACTIVE,
  })
  status: UserStatus;

  @ApiProperty({ default: false, example: false })
  @Column({ type: 'boolean', default: false })
  email_verified: boolean;

  @ApiProperty({ example: 'local', description: 'local | google | facebook' })
  @Column({ type: 'varchar', length: 32, default: 'local' })
  provider: string;

  @ApiPropertyOptional({
    type: String,
    format: 'date-time',
    example: SWAGGER_EXAMPLE_DATETIME,
    nullable: true,
  })
  @Column({ type: 'timestamptz', nullable: true })
  last_login_at?: Date | null;

  @ApiProperty({ type: String, format: 'date-time', example: SWAGGER_EXAMPLE_DATETIME })
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @ApiProperty({ type: String, format: 'date-time', example: SWAGGER_EXAMPLE_DATETIME })
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @ApiPropertyOptional({
    type: String,
    format: 'date-time',
    example: SWAGGER_EXAMPLE_DATETIME,
    nullable: true,
  })
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at?: Date | null;
}
