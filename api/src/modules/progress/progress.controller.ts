import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProgressService } from './progress.service';
import { UpdateProgressBodyDto } from './dtos/update-progress.dto';
import { JwtAuthGuard } from 'src/common/gaurds/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('progress')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get()
  async findAll(@CurrentUser() user: User) {
    const data = await this.progressService.findAllForUser(user.id);
    return { success: true, message: 'Progress fetched successfully', data };
  }

  @Get('stats')
  async stats(@CurrentUser() user: User) {
    const data = await this.progressService.getStats(user.id);
    return { success: true, message: 'Stats fetched successfully', data };
  }

  @Patch(':wordId')
  async update(
    @Param('wordId', ParseUUIDPipe) wordId: string,
    @Body() dto: UpdateProgressBodyDto,
    @CurrentUser() user: User,
  ) {
    const data = await this.progressService.upsert(user.id, wordId, dto.status);
    return { success: true, message: 'Progress updated successfully', data };
  }
}
