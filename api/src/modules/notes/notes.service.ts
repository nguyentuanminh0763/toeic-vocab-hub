import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserNote, type NoteStatus } from './entities/user-note.entity';
import { CreateNoteDto } from './dtos/create-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(UserNote)
    private readonly repo: Repository<UserNote>,
  ) {}

  async create(userId: string, dto: CreateNoteDto): Promise<UserNote> {
    const note = this.repo.create({
      user_id: userId,
      word: dto.word,
      meaning: dto.meaning,
      word_form: dto.word_form ?? 'noun',
      ipa: dto.ipa ?? null,
      example: dto.example ?? null,
    });
    return this.repo.save(note);
  }

  findAll(userId: string): Promise<UserNote[]> {
    return this.repo.find({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
    });
  }

  async updateStatus(userId: string, noteId: string, status: NoteStatus): Promise<UserNote> {
    const note = await this.repo.findOne({ where: { id: noteId } });
    if (!note) throw new NotFoundException(`Note ${noteId} not found`);
    if (note.user_id !== userId) throw new ForbiddenException();
    note.status = status;
    return this.repo.save(note);
  }

  async remove(userId: string, noteId: string): Promise<void> {
    const note = await this.repo.findOne({ where: { id: noteId } });
    if (!note) throw new NotFoundException(`Note ${noteId} not found`);
    if (note.user_id !== userId) throw new ForbiddenException();
    await this.repo.remove(note);
  }
}
