import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from 'src/app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { GeneralExceptionFilter } from './common/filters/general-exception.filter';
import { morganLogger } from './common/middlewares/logs';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { validationExceptionFactory } from './common/exceptions/validation-exception.factory';
import { AuthGuard } from './common/guards/auth.guard';
import { I18nContext, I18nValidationPipe } from 'nestjs-i18n';
import { ValidationError } from 'class-validator';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalGuards(new AuthGuard(configService));

  app.useGlobalPipes(
    new I18nValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new GeneralExceptionFilter(), new HttpExceptionFilter());

  app.use(morganLogger);

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.enableCors();

  await app.listen(3000);
};

bootstrap();
