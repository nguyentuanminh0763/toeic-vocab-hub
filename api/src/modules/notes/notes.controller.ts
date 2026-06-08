import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
import { JwtAuthGuard } from 'src/common/gaurds/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('notes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async create(@Body() dto: CreateNoteDto, @CurrentUser() user: User) {
    const data = await this.notesService.create(user.id, dto);
    return { success: true, message: 'Note created', data };
  }

  @Get()
  async findAll(@CurrentUser() user: User) {
    const data = await this.notesService.findAll(user.id);
    return { success: true, message: 'Notes fetched', data };
  }

  @Patch(':id')
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateNoteDto,
    @CurrentUser() user: User,
  ) {
    const data = await this.notesService.updateStatus(user.id, id, dto.status);
    return { success: true, message: 'Note updated', data };
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
    await this.notesService.remove(user.id, id);
  }
}
