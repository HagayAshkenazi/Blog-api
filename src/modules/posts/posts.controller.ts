import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Put,
  Body,
} from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAllPosts() {
    return this.postsService.findAllPosts();
  }

  @Get(':id')
  async findPostById(
    @Param('id', ParseUUIDPipe) id: string,
    @I18n() i18n: I18nContext,
  ) {
    return this.postsService.findPostById(id, i18n);
  }

  @Put()
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @I18n() i18n: I18nContext,
  ) {
    return this.postsService.create(createPostDto, i18n);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
    @I18n() i18n: I18nContext,
  ) {
    return this.postsService.update(id, updatePostDto, i18n);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @I18n() i18n: I18nContext,
  ) {
    return this.postsService.delete(id, i18n);
  }
}
