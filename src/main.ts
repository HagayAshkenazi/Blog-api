import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { I18nValidationPipe } from '@/common/pipes/i18n-validation.pipe';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';
import { GeneralExceptionFilter } from '@/common/filters/general-exception.filter';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { morganLogger } from '@/common/middlewares/logs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthGuard } from '@/common/guards/auth.guard';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get('ConfigService');

  app.enableCors();
  app.use(helmet());

  app.useGlobalPipes(new I18nValidationPipe());
  app.useGlobalGuards(new AuthGuard(configService));
  app.useGlobalFilters(new GeneralExceptionFilter(), new HttpExceptionFilter());
 
  app.use(morganLogger);

  app.useGlobalInterceptors(new LoggingInterceptor());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Blog')
    .setDescription('Blog API')
    .setVersion('1.0')
    .addTag('blogs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.setGlobalPrefix('/api', { exclude: ['/'] });
  await app.listen(process.env.PORT_NUMBER || 3000);
};

bootstrap();
