import { Body, Controller, Delete, Get, Header, HttpCode, Param, ParseUUIDPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { WordsService } from './words.service';
import { GetWordsQueryDto } from './dtos/get-words-query.dto';
import { CreatePrivateWordDto } from './dtos/create-private-word.dto';
import { JwtAuthGuard } from 'src/common/gaurds/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import type { JwtPayload } from '../auth/jwt.strategy';

@ApiTags('words')
@Controller('words')
export class WordsController {
  constructor(
    private readonly wordsService: WordsService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  @Header('Cache-Control', 'no-store')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async findAll(@Query() query: GetWordsQueryDto, @Req() req: any) {
    // Đọc token thủ công — không dùng guard để tránh lỗi optional auth
    let userId: string | undefined;
    const auth: string | undefined = req.headers?.authorization;
    if (auth?.startsWith('Bearer ')) {
      try {
        const payload = this.jwtService.verify<JwtPayload>(auth.slice(7));
        userId = payload.sub;
      } catch { /* token hết hạn hoặc không hợp lệ → xử lý như anonymous */ }
    }

    const data = await this.wordsService.findAll(query.set, userId);
    return { success: true, message: 'Words fetched successfully', data };
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createPrivate(@Body() dto: CreatePrivateWordDto, @CurrentUser() user: User) {
    const data = await this.wordsService.createPrivate(user.id, dto);
    return { success: true, message: 'Word created', data };
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async removePrivate(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
    await this.wordsService.removePrivate(user.id, id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.wordsService.findOne(id);
    return { success: true, message: 'Word fetched successfully', data };
  }
}
