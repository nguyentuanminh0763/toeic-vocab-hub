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
import { ApiProperty } from '@nestjs/swagger';
import { SWAGGER_EXAMPLE_UUID } from 'src/common/swagger-examples';
import { User } from 'src/modules/users/entities/user.entity';
import { Word } from 'src/modules/words/entities/word.entity';

export const WORD_STATUS = {
  OK: 'ok',
  HARD: 'hard',
  UNSEEN: 'unseen',
} as const;

export type WordStatus = (typeof WORD_STATUS)[keyof typeof WORD_STATUS];

@Entity('user_word_progress')
@Unique('uq_user_word', ['user_id', 'word_id'])
@Index('idx_progress_user_id', ['user_id'])
export class UserWordProgress {
  @ApiProperty({ format: 'uuid', example: SWAGGER_EXAMPLE_UUID })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ format: 'uuid' })
  @Column({ type: 'uuid' })
  user_id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({ format: 'uuid' })
  @Column({ type: 'uuid' })
  word_id: string;

  @ManyToOne(() => Word, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'word_id' })
  word: Word;

  @ApiProperty({ enum: ['ok', 'hard', 'unseen'], example: 'unseen' })
  @Column({ type: 'varchar', length: 16, default: WORD_STATUS.UNSEEN })
  status: WordStatus;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
