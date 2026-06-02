import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { SpendingSession } from './entities/spending-session.entity';
import { Expense } from './entities/expense.entity';
import { User } from '../users/entities/user.entity';
import { SpendingService } from './spending.service';
import { SpendingController } from './spending.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, SpendingSession, Expense, User]),
  ],
  controllers: [SpendingController],
  providers: [SpendingService],
  exports: [SpendingService],
})
export class SpendingModule {}
