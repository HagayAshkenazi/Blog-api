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
import { PostDto } from '@/modules/posts/dto/post.dto';
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
  ): Promise<PostData | undefined> {
    return await this.postsService.find(id);
  }

  @Post()
  async create(@Body() createPostDto: PostDto): Promise<PostData> {
    return await this.postsService.create(createPostDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: PostDto,
  ): Promise<PostData | undefined> {
    return await this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.postsService.delete(id);
  }
}
