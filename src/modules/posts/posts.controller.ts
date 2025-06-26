import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/common/guards/auth.guard';

import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostData } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAllPosts(): Promise<PostData[]> {
    return await this.postsService.findAllPosts();
  }

  @Get(':id')
  async findPostById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<PostData> {
    return await this.postsService.findPostById(id);
  }

  @Put()
  async createPost(
    @Body() createPostDto: CreatePostDto,
  ): Promise<{ message: string; post: PostData }> {
    return await this.postsService.create(createPostDto);
  }

  @Patch(':id')
  async updatePost(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<{ message: string; post: PostData }> {
    return await this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  async deletePost(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ message: string }> {
    return await this.postsService.delete(id);
  }
}
