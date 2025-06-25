import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async findAllPosts() {
    return this.postsRepository.findAllPosts();
  }

  async findPostById(id: string, i18nContext: I18nContext) {
    return this.postsRepository.findPostById(id, i18nContext);
  }

  async create(data: CreatePostDto, i18nContext: I18nContext) {
    return this.postsRepository.create(data, i18nContext);
  }

  async update(id: string, data: UpdatePostDto, i18nContext: I18nContext) {
    return this.postsRepository.update(id, data, i18nContext);
  }

  async delete(id: string, i18nContext: I18nContext) {
    return this.postsRepository.delete(id, i18nContext);
  }
}
