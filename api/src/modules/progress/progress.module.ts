import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWordProgress } from './entities/user-word-progress.entity';
import { Word } from 'src/modules/words/entities/word.entity';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserWordProgress, Word])],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
