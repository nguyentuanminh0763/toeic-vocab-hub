import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SWAGGER_EXAMPLE_DATETIME, SWAGGER_EXAMPLE_UUID, SWAGGER_EXAMPLE_UUID_B } from 'src/common/swagger-examples';
import { User } from 'src/modules/users/entities/user.entity';
import { Category } from './category.entity';
import { SpendingSession } from './spending-session.entity';

@Entity('expenses')
@Index('idx_expenses_session_id', ['spending_session_id'])
export class Expense {
  @ApiProperty({ format: 'uuid', example: SWAGGER_EXAMPLE_UUID })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ format: 'uuid', example: SWAGGER_EXAMPLE_UUID_B })
  @Column({ type: 'uuid' })
  spending_session_id: string;

  @ApiHideProperty()
  @ManyToOne(() => SpendingSession, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'spending_session_id' })
  spending_session: SpendingSession;

  @ApiProperty({ format: 'uuid', example: SWAGGER_EXAMPLE_UUID })
  @Column({ type: 'uuid' })
  user_id: string;

  @ApiHideProperty()
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({ format: 'uuid', example: SWAGGER_EXAMPLE_UUID_B })
  @Column({ type: 'uuid' })
  category_id: string;

  @ApiHideProperty()
  @ManyToOne(() => Category, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ApiProperty({
    example: '120000.00',
    description: 'Số tiền (decimal trong DB, string trong entity)',
  })
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: string;

  @ApiPropertyOptional({ example: 'Ăn trưa tại quán', nullable: true })
  @Column({ type: 'varchar', length: 500, nullable: true })
  note: string | null;

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
  deleted_at: Date | null;
}
