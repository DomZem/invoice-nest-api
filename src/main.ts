import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseExceptionFilter } from './common/filter/database-exception.filter';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.use(cookieParser());
  app.useGlobalFilters(new DatabaseExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const corsOrigin = configService.get<string>(
    'CORS_ORIGIN',
    'http://localhost:3000',
  );
  const port = configService.get<number>('PORT');

  app.enableCors({
    origin: corsOrigin,
    credentials: true,
  });

  await app.listen(port);
}
bootstrap();
