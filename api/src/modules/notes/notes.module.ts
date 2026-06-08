import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserNote } from './entities/user-note.entity';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserNote])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
