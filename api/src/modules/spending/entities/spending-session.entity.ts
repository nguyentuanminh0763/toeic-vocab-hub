import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { SWAGGER_EXAMPLE_DATETIME, SWAGGER_EXAMPLE_UUID } from 'src/common/swagger-examples';
import { User } from 'src/modules/users/entities/user.entity';
import {
  SPENDING_SESSION,
  SPENDING_SESSION_VALUES,
  type SpendingSessionName,
} from 'src/common/enums/spending-session.enum';

@Entity('spending_sessions')
@Unique('uq_spending_session_user_date_slot', [
  'user_id',
  'session_date',
  'session',
])
@Index('idx_spending_sessions_user_date', ['user_id', 'session_date'])
export class SpendingSession {
  @ApiProperty({ format: 'uuid', example: SWAGGER_EXAMPLE_UUID })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ format: 'uuid', example: SWAGGER_EXAMPLE_UUID })
  @Column({ type: 'uuid' })
  user_id: string;

  @ApiHideProperty()
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({ example: '2026-04-03', description: 'Ngày (YYYY-MM-DD)' })
  @Column({ type: 'date' })
  session_date: string;

  @ApiProperty({
    enum: SPENDING_SESSION_VALUES,
    default: SPENDING_SESSION.MORNING,
    example: SPENDING_SESSION.MORNING,
    description: 'Khung giờ trong ngày',
  })
  @Column({
    type: 'varchar',
    length: 16,
    default: SPENDING_SESSION.MORNING,
  })
  session: SpendingSessionName;

  @ApiProperty({ default: false, example: false, description: 'Không chi tiêu buổi này' })
  @Column({ type: 'boolean', default: false })
  is_no_spend: boolean;

  @ApiProperty({ default: false, example: true, description: 'Đã xác nhận buổi' })
  @Column({ type: 'boolean', default: false })
  confirmed: boolean;

  @ApiProperty({ type: String, format: 'date-time', example: SWAGGER_EXAMPLE_DATETIME })
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @ApiProperty({ type: String, format: 'date-time', example: SWAGGER_EXAMPLE_DATETIME })
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
