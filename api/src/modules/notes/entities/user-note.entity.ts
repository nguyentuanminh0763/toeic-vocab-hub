import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SWAGGER_EXAMPLE_UUID } from 'src/common/swagger-examples';
import { User } from 'src/modules/users/entities/user.entity';

export const NOTE_STATUS = { OK: 'ok', HARD: 'hard', UNSEEN: 'unseen' } as const;
export type NoteStatus = (typeof NOTE_STATUS)[keyof typeof NOTE_STATUS];

@Entity('user_notes')
@Index('idx_notes_user_id', ['user_id'])
export class UserNote {
  @ApiProperty({ format: 'uuid', example: SWAGGER_EXAMPLE_UUID })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({ example: 'eloquent' })
  @Column({ type: 'varchar', length: 255 })
  word: string;

  @ApiProperty({ example: 'hùng hồn, lưu loát' })
  @Column({ type: 'varchar', length: 500 })
  meaning: string;

  @ApiPropertyOptional({ example: 'adjective' })
  @Column({ type: 'varchar', length: 64, default: 'noun' })
  word_form: string;

  @ApiPropertyOptional({ example: '/ˈel.ə.kwənt/' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  ipa: string | null;

  @ApiPropertyOptional({ example: 'She gave an eloquent speech.' })
  @Column({ type: 'text', nullable: true })
  example: string | null;

  @ApiProperty({ enum: ['ok', 'hard', 'unseen'], example: 'hard' })
  @Column({ type: 'varchar', length: 16, default: NOTE_STATUS.HARD })
  status: NoteStatus;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
