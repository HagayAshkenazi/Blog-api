import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from '@/modules/posts/posts.service';
import { CreatePostDto } from '@/modules/posts/dto/create-post.dto';
import { UpdatePostDto } from '@/modules/posts/dto/update-post.dto';
import { Post as PostData } from '@prisma/client';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(): Promise<PostData[]> {
    return await this.postsService.findAll();
  }

  @Get(':id')
  async find(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<PostData | null> {
    return await this.postsService.find(id);
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<PostData> {
    return await this.postsService.create(createPostDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostData> {
    return await this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.postsService.delete(id);
  }
}
