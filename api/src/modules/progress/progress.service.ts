import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserWordProgress, WordStatus } from './entities/user-word-progress.entity';
import { Word } from 'src/modules/words/entities/word.entity';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(UserWordProgress)
    private readonly progressRepository: Repository<UserWordProgress>,
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
  ) {}

  async findAllForUser(user_id: string): Promise<UserWordProgress[]> {
    return this.progressRepository.find({
      where: { user_id },
      relations: ['word'],
      order: { word: { sort_order: 'ASC' } },
    });
  }

  async upsert(user_id: string, word_id: string, status: WordStatus): Promise<UserWordProgress> {
    const word = await this.wordRepository.findOne({ where: { id: word_id } });
    if (!word) throw new NotFoundException(`Word ${word_id} not found`);

    let progress = await this.progressRepository.findOne({
      where: { user_id, word_id },
    });

    if (progress) {
      progress.status = status;
    } else {
      progress = this.progressRepository.create({ user_id, word_id, status });
    }

    return this.progressRepository.save(progress);
  }

  async getStats(user_id: string): Promise<{ total: number; ok: number; hard: number; seen: number }> {
    const total = await this.wordRepository.count();
    const rows = await this.progressRepository.find({ where: { user_id } });

    const ok = rows.filter((r) => r.status === 'ok').length;
    const hard = rows.filter((r) => r.status === 'hard').length;
    const seen = rows.filter((r) => r.status !== 'unseen').length;

    return { total, ok, hard, seen };
  }
}
