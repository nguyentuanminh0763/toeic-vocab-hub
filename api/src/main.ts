import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { swaggerExtraModels } from './swagger-extra-models';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation cho DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // @Exclude() hoạt động
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Cho phép frontend React gọi API
  app.enableCors({
    origin: [
      process.env.CORS_ORIGIN || 'http://localhost:3001',
      'http://localhost:5173', // legacy React dev
    ],
    credentials: true,
  });

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('TOEIC Vocab API')
    .setDescription('API for TOEIC Vocab Hub — ETS 2026')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth')
    .addTag('words')
    .addTag('progress')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [...swaggerExtraModels],
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
