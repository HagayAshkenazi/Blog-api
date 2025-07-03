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
import { ConfigService } from '@nestjs/config';
import { I18nService } from 'nestjs-i18n';
import { PrismaNotFoundFilter } from '@/common/filters/prisma-not-found.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const i18nService: I18nService = app.get(I18nService);

  app.enableCors();
  app.use(helmet());
  app.use(morganLogger);

  app.useGlobalPipes(new I18nValidationPipe(i18nService));

  app.useGlobalGuards(new AuthGuard(configService, i18nService));

  app.useGlobalFilters(
    new GeneralExceptionFilter(i18nService),
    new HttpExceptionFilter(),
    new PrismaNotFoundFilter(i18nService),
  );

  app.useGlobalInterceptors(new LoggingInterceptor());

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Blog')
    .setDescription('Blog API documentation')
    .setVersion('1.0')
    .addTag('blogs')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);

  app.setGlobalPrefix('/api', {
    exclude: ['/healthcheck', '/status', '/metrics'],
  });

  await app.init();
  const port = configService.get<number>('PORT_NUMBER') || 3000;
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
