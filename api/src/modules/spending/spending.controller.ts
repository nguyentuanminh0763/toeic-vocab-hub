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
import { SpendingService } from './spending.service';
import { GetCategoriesQueryDto } from './dtos/get-categories-query.dto';
import { GetSpendingDayQueryDto } from './dtos/get-spending-day-query.dto';
import { UpdateSpendingSessionDto } from './dtos/update-spending-session.dto';
import { CreateExpenseDto } from './dtos/create-expense.dto';

@ApiTags('spending')
@Controller('spending')
export class SpendingController {
  constructor(private readonly spendingService: SpendingService) {}

  @Get('categories')
  async getCategories(@Query() query: GetCategoriesQueryDto) {
    const data = await this.spendingService.getCategoriesForUser(query.user_id);
    return {
      success: true,
      data,
      message: 'Categories fetched successfully',
    };
  }

  @Get('day')
  async getDay(@Query() query: GetSpendingDayQueryDto) {
    const data = await this.spendingService.getDay(
      query.user_id,
      query.session_date,
    );
    return {
      success: true,
      data,
      message: 'Spending day fetched successfully',
    };
  }

  @Patch('sessions/:id')
  async patchSession(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('user_id', ParseUUIDPipe) user_id: string,
    @Body() dto: UpdateSpendingSessionDto,
  ) {
    const data = await this.spendingService.updateSession(id, user_id, dto);
    return {
      success: true,
      data,
      message: 'Session updated successfully',
    };
  }

  @Post('expenses')
  async createExpense(@Body() dto: CreateExpenseDto) {
    const data = await this.spendingService.createExpense(dto);
    return {
      success: true,
      data,
      message: 'Expense created successfully',
    };
  }

  @Delete('expenses/:id')
  async removeExpense(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('user_id', ParseUUIDPipe) user_id: string,
  ) {
    await this.spendingService.removeExpense(id, user_id);
    return {
      success: true,
      message: 'Expense deleted successfully',
    };
  }
}
