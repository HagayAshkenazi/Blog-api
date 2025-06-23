import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async findAllPosts() {
    return await this.postsRepository.findAllPosts();
  }

  async findPostById(id: string) {
    return await this.postsRepository.findPostById(id);
  }

  async create(data: CreatePostDto) {
    return await this.postsRepository.create(data);
  }

  async update(id: string, data: UpdatePostDto) {
    return await this.postsRepository.update(id, data);
  }

  async delete(id: string) {
    return await this.postsRepository.delete(id);
  }
}
