import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProgressService } from './progress.service';
import { GetProgressQueryDto } from './dtos/get-progress-query.dto';
import { UpdateProgressDto } from './dtos/update-progress.dto';

@ApiTags('progress')
@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get()
  async findAll(@Query() query: GetProgressQueryDto) {
    const data = await this.progressService.findAllForUser(query.user_id);
    return { success: true, message: 'Progress fetched successfully', data };
  }

  @Get('stats')
  async stats(@Query() query: GetProgressQueryDto) {
    const data = await this.progressService.getStats(query.user_id);
    return { success: true, message: 'Stats fetched successfully', data };
  }

  @Patch(':wordId')
  async update(
    @Param('wordId', ParseUUIDPipe) wordId: string,
    @Body() dto: UpdateProgressDto,
  ) {
    const data = await this.progressService.upsert(dto.user_id, wordId, dto.status);
    return { success: true, message: 'Progress updated successfully', data };
  }
}
