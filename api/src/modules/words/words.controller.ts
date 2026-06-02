import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WordsService } from './words.service';
import { GetWordsQueryDto } from './dtos/get-words-query.dto';

@ApiTags('words')
@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  async findAll(@Query() query: GetWordsQueryDto) {
    const data = await this.wordsService.findAll(query.set);
    return { success: true, message: 'Words fetched successfully', data };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.wordsService.findOne(id);
    return { success: true, message: 'Word fetched successfully', data };
  }
}
