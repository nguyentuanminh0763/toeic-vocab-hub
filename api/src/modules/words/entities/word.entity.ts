import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SWAGGER_EXAMPLE_UUID } from 'src/common/swagger-examples';

@Entity('words')
@Index('idx_words_set_name', ['set_name'])
export class Word {
  @ApiProperty({ format: 'uuid', example: SWAGGER_EXAMPLE_UUID })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'take place' })
  @Column({ type: 'varchar', length: 255 })
  word: string;

  @ApiProperty({ example: 'verb phrase' })
  @Column({ type: 'varchar', length: 64 })
  word_form: string;

  @ApiProperty({ example: '/teɪk pleɪs/' })
  @Column({ type: 'varchar', length: 255 })
  ipa: string;

  @ApiProperty({ example: 'diễn ra' })
  @Column({ type: 'varchar', length: 500 })
  meaning: string;

  @ApiProperty({ example: 'The meeting will take place in the main conference room.' })
  @Column({ type: 'text' })
  example: string;

  @ApiProperty({ example: 'ETS_2026_TEST1', description: 'Bộ từ vựng' })
  @Column({ type: 'varchar', length: 64, default: 'ETS_2026_TEST1' })
  set_name: string;

  @ApiPropertyOptional({ example: 1, description: 'Thứ tự trong bộ' })
  @Column({ type: 'int', default: 0 })
  sort_order: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
