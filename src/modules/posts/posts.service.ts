import { Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Post as PostData } from '@prisma/client';
import { PostsRepository } from '@/modules/posts/posts.repository';
import { CreatePostDto } from '@/modules/posts/dto/create-post.dto';
import { UpdatePostDto } from '@/modules/posts/dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly i18n: I18nService,
  ) {}

  async findAll(): Promise<PostData[]> {
    return await this.postsRepository.findAll();
  }

  async find(id: string): Promise<PostData | null> {
    return await this.findOrThrow(id);
  }

  async create(data: CreatePostDto): Promise<PostData> {
    return await this.postsRepository.create(data);
  }

  async update(id: string, data: UpdatePostDto): Promise<PostData> {
    return await this.postsRepository.update(id, {
      title: data.title,
      content: data.content,
    });
  }

  async delete(id: string): Promise<void> {
    await this.postsRepository.delete(id);
  }

  private async findOrThrow(id: string): Promise<PostData | null> {
    try {
      return await this.postsRepository.find(id); 
    } catch (error) {
      throw new NotFoundException(
        await this.i18n.translate('common.posts.errors.NOT_FOUND', {
          args: { id },
        }),
      );
    }
  }
}
