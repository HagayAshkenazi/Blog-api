import { Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Post as PostData, Prisma } from '@prisma/client';
import { PostsRepository } from '@/modules/posts/posts.repository';
import { PostDto } from '@/modules/posts/dto/post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly i18n: I18nService,
  ) {}

  async findAll(): Promise<PostData[]> {
    return this.postsRepository.findAll();
  }

  async find(id: string): Promise<PostData | undefined> {
    return await this.postsRepository.find(id);
  }

  async create(data: PostDto): Promise<PostData> {
    return this.postsRepository.create(data);
  }

  async update(id: string, data: PostDto): Promise<PostData | undefined> {
    return await this.postsRepository.update(id, {
      title: data.title,
      content: data.content,
    });
  }

  async delete(id: string): Promise<void> {
    await this.postsRepository.delete(id);
  }
}
