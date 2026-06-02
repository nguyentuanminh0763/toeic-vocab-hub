import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SWAGGER_EXAMPLE_DATETIME, SWAGGER_EXAMPLE_UUID } from 'src/common/swagger-examples';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('categories')
@Index('idx_categories_user_id', ['user_id'])
export class Category {
  @ApiProperty({ format: 'uuid', example: SWAGGER_EXAMPLE_UUID })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiPropertyOptional({
    format: 'uuid',
    example: SWAGGER_EXAMPLE_UUID,
    nullable: true,
    description: 'null = danh mục hệ thống',
  })
  @Column({ type: 'uuid', nullable: true })
  user_id: string | null;

  @ApiHideProperty()
  @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User | null;

  @ApiProperty({ example: 'Ăn uống' })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({ example: 'utensils', description: 'Tên icon (Lucide / tương tự)' })
  @Column({ type: 'varchar', length: 50 })
  icon: string;

  @ApiProperty({ example: '#22c55e', description: 'Màu hex (#RRGGBB)' })
  @Column({ type: 'varchar', length: 7 })
  color: string;

  @ApiProperty({ default: false, example: true, description: 'Danh mục mặc định khi seed' })
  @Column({ type: 'boolean', default: false })
  is_default: boolean;

  @ApiProperty({ type: String, format: 'date-time', example: SWAGGER_EXAMPLE_DATETIME })
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
