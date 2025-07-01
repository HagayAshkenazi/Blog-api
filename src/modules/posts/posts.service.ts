import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Post as PostData, Prisma } from '@prisma/client';
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
    return this.postsRepository.findAll();
  }

  async find(id: string): Promise<PostData | undefined> {
    try {
      return await this.postsRepository.find(id);
    } catch (error) {
      await this.handleNotFound(error, id);
    }
  }

  async create(data: CreatePostDto): Promise<PostData> {
    return this.postsRepository.create(data);
  }

  async update(id: string, data: UpdatePostDto): Promise<PostData | undefined> {
    try {
      return await this.postsRepository.update(id, {
        title: data.title,
        content: data.content,
      });
    } catch (error) {
       await this.handleNotFound(error, id);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.postsRepository.delete(id);
    } catch (error) {
      await this.handleNotFound(error, id);
    }
  }

  private async handleNotFound(
    error: Prisma.PrismaClientKnownRequestError | Error,
    id: string,
  ): Promise<void> {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      const message = await this.i18n.translate('common.posts.errors.NOT_FOUND', {
        args: { id },
      });
      throw new NotFoundException(message);
    }

    throw error;
  }
}
