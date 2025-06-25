import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async findAllPosts() {
    return this.postsRepository.findAllPosts();
  }

  async findPostById(id: string) {
    return this.postsRepository.findPostById(id);
  }

  async create(data: CreatePostDto) {
    return this.postsRepository.create(data);
  }

  async update(id: string, data: UpdatePostDto) {
    return this.postsRepository.update(id, data);
  }

  async delete(id: string) {
    return this.postsRepository.delete(id);
  }
}
