import { Module } from '@nestjs/common';
import { PostsController } from '@/modules/posts/posts.controller';
import { PostsService } from '@/modules/posts/posts.service';
import { PostsRepository } from '@/modules/posts/posts.repository';
import { PrismaModule } from 'database/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [PostsService],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule {}
