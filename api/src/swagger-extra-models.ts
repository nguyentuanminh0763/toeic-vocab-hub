import { LoginDto } from './modules/auth/dtos/login.dto';
import { SignupDto } from './modules/auth/dtos/signup.dto';
import { CreateExpenseDto } from './modules/spending/dtos/create-expense.dto';
import { GetCategoriesQueryDto } from './modules/spending/dtos/get-categories-query.dto';
import { GetSpendingDayQueryDto } from './modules/spending/dtos/get-spending-day-query.dto';
import { UpdateSpendingSessionDto } from './modules/spending/dtos/update-spending-session.dto';
import { Category } from './modules/spending/entities/category.entity';
import { Expense } from './modules/spending/entities/expense.entity';
import { SpendingSession } from './modules/spending/entities/spending-session.entity';
import { CreateTaskDto } from './modules/tasks/dtos/create-task.dto';
import { GetTasksQueryDto } from './modules/tasks/dtos/get-tasks-query.dto';
import { UpdateTaskDto } from './modules/tasks/dtos/update-task.dto';
import { Task } from './modules/tasks/entities/task.entity';
import { CreateUserDto } from './modules/users/dtos/create-user.dto';
import { User } from './modules/users/entities/user.entity';

/**
 * Đăng ký thêm vào OpenAPI components.schemas (mục Schemas trên Swagger UI).
 * Entity không dùng làm @Body() nên cần extraModels để luôn có trong tài liệu.
 */
export const swaggerExtraModels = [
  User,
  Task,
  Category,
  SpendingSession,
  Expense,
  LoginDto,
  SignupDto,
  CreateUserDto,
  CreateTaskDto,
  UpdateTaskDto,
  GetTasksQueryDto,
  GetCategoriesQueryDto,
  GetSpendingDayQueryDto,
  UpdateSpendingSessionDto,
  CreateExpenseDto,
];
