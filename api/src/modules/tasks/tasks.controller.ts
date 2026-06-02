import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { GetTasksQueryDto } from './dtos/get-tasks-query.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() dto: CreateTaskDto) {
    const data = await this.tasksService.create(dto);
    return {
      success: true,
      data,
      message: 'Task created successfully',
    };
  }

  @Get()
  async findAll(@Query() query: GetTasksQueryDto) {
    const data = await this.tasksService.findAllForUser(query);
    return {
      success: true,
      data,
      message: 'Tasks fetched successfully',
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('user_id', ParseUUIDPipe) user_id: string,
  ) {
    const data = await this.tasksService.findOneForUser(id, user_id);
    return {
      success: true,
      data,
      message: 'Task fetched successfully',
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('user_id', ParseUUIDPipe) user_id: string,
    @Body() dto: UpdateTaskDto,
  ) {
    const data = await this.tasksService.update(id, user_id, dto);
    return {
      success: true,
      data,
      message: 'Task updated successfully',
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('user_id', ParseUUIDPipe) user_id: string,
  ) {
    await this.tasksService.remove(id, user_id);
    return {
      success: true,
      message: 'Task deleted successfully',
    };
  }
}
