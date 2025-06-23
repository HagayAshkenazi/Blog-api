import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { GeneralExceptionFilter } from './common/filters/general-exception.filter';
import { morganLogger } from './common/middlewares/logs';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { validationExceptionFactory } from './common/exceptions/validation-exception.factory';
import { AuthGuard } from './common/guards/auth.guard';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalGuards(new AuthGuard(configService));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: validationExceptionFactory,
    }),
  );

  app.useGlobalFilters(
    new GeneralExceptionFilter(),
    new HttpExceptionFilter(),
  );

  app.use(morganLogger);

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.enableCors();

  await app.listen(3000);
}

bootstrap();
