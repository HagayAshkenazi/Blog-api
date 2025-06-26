import { Injectable, NotFoundException } from '@nestjs/common';

import { I18nService } from 'nestjs-i18n';
import { PostData } from '@prisma/client';

import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly i18n: I18nService,
  ) {}

  async findAllPosts(): Promise<PostData[]> {
    return this.postsRepository.findAllPosts();
  }

  async findPostById(id: string): Promise<PostData> {
    return this.getPostOrThrow(id);
  }

  async create(
    data: CreatePostDto,
  ): Promise<{ message: string; post: PostData }> {
    const post = await this.postsRepository.create(data);

    return {
      message: await this.i18n.translate('common.posts.success.CREATED'),

      post,
    };
  }

  async update(
    id: string,
    data: UpdatePostDto,
  ): Promise<{ message: string; post: PostData }> {
    const post = await this.getPostOrThrow(id);

    const updatedPost = await this.postsRepository.update(id, {
      title: data.title ?? post.title,
      content: data.content ?? post.content,
    });

    return {
      message: await this.i18n.translate('common.posts.success.UPDATED'),
      post: updatedPost,
    };
  }

  async delete(id: string): Promise<{ message: string }> {
    await this.getPostOrThrow(id);
    await this.postsRepository.delete(id);

    return {
      message: await this.i18n.translate('common.posts.success.DELETED'),
    };
  }

  private async getPostOrThrow(id: string): Promise<PostData> {
    const post = await this.postsRepository.findPostById(id);

    if (!post) {
      throw new NotFoundException(
        await this.i18n.translate('common.posts.errors.NOT_FOUND', {
          args: { id },
        }),
      );
    }

    return post;
  }
}
