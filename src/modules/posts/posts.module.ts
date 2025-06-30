import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../prisma/prisma.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repository';

@Module({
  imports: [PrismaModule],
  exports: [PostsService],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule {}
