import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostsModule,
  ],
})
export class AppModule {}
