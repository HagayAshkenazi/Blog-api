import { Injectable } from '@nestjs/common';
import { Post as PostData } from '@prisma/client';
import { PostsRepository } from '@/modules/posts/posts.repository';
import { PostDto } from '@/modules/posts/dto/post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

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
