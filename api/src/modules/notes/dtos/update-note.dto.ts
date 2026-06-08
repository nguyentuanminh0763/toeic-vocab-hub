import { IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NOTE_STATUS, type NoteStatus } from '../entities/user-note.entity';

export class UpdateNoteDto {
  @ApiProperty({ enum: ['ok', 'hard', 'unseen'] })
  @IsIn(Object.values(NOTE_STATUS))
  status: NoteStatus;
}
