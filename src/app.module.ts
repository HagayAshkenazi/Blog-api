import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  I18nModule,
  I18nJsonLoader,
  QueryResolver,
  AcceptLanguageResolver,
} from 'nestjs-i18n';
import * as path from 'path';

import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        watch: true,
        path: path.join(__dirname, '/i18n/'),
      },
      resolvers: [
        { options: ['lang'], use: QueryResolver },
        AcceptLanguageResolver,
      ],
    }),

    PostsModule,
  ],
})
export class AppModule {}
