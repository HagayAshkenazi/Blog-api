import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from 'src/app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { GeneralExceptionFilter } from './common/filters/general-exception.filter';
import { morganLogger } from './common/middlewares/logs';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { AuthGuard } from './common/guards/auth.guard';
import { I18nValidationPipe, I18nService } from 'nestjs-i18n';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const i18nService = app.get<I18nService<Record<string, unknown>>>(I18nService);

  app.useGlobalGuards(new AuthGuard(configService, i18nService));

  app.useGlobalPipes(
    new I18nValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(
    new GeneralExceptionFilter(),
    new HttpExceptionFilter()
  );

  app.use(morganLogger);

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.enableCors();

  await app.listen(3000);
};

bootstrap();