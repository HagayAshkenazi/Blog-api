import { Injectable } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async findAllPosts() {
    return this.postsRepository.findAllPosts();
  }

  async findPostById(id: string, i18n: I18nContext) {
    return this.postsRepository.findPostById(id, i18n);
  }

  async create(data: CreatePostDto, i18n: I18nContext) {
    return this.postsRepository.create(data, i18n);
  }

  async update(id: string, data: UpdatePostDto, i18n: I18nContext) {
    return this.postsRepository.update(id, data, i18n);
  }

  async delete(id: string, i18n: I18nContext) {
    return this.postsRepository.delete(id, i18n);
  }
}
