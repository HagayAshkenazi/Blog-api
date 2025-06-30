import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostData } from '@prisma/client';

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

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto): Promise<PostData> {
    return await this.postsService.create(createPostDto);
  }

  @Patch(':id')
  async updatePost(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostData> {
    return await this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  async deletePost(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.postsService.delete(id);
  }
}
