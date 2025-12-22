import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './modules/posts/posts.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { I18nModule, QueryResolver, AcceptLanguageResolver } from 'nestjs-i18n';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        watch: true,
        path: path.join(__dirname, 'locales'),
      },
      resolvers: [
        { options: ['lang'], use: QueryResolver },
        AcceptLanguageResolver,
      ],
    }),
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60, limit: 10 }],
    }),
    PostsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
