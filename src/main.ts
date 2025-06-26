import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from 'src/app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { GeneralExceptionFilter } from './common/filters/general-exception.filter';
import { morganLogger } from './common/middlewares/logs';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { I18nValidationPipe } from 'src/common/pipes/i18n-validation.pipe';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(new I18nValidationPipe()); 

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
