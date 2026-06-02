import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { SpendingModule } from './modules/spending/spending.module';
import { WordsModule } from './modules/words/words.module';
import { ProgressModule } from './modules/progress/progress.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      envFilePath: '.env', // ✅ Chỉ định rõ đường dẫn file .env (mặc định nó tự tìm)
    }),
    TypeOrmModule.forRootAsync({
      // imports: [ConfigModule], // ❌ KHÔNG CẦN vì ConfigModule đã là global
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true, // ✅ Tự động load các entity
        // Lấy giá trị, so sánh với chuỗi 'true'. Nếu không có, mặc định là false cho an toàn.
        synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
        logging: true, // Ghi log câu query SQL (nên bật để debug)
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    TasksModule,
    SpendingModule,
    WordsModule,
    ProgressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
