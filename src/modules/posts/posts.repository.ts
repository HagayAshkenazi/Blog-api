import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { I18nContext } from 'nestjs-i18n';
import { PostData } from '@prisma/client';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPosts(): Promise<PostData[]> {
    return this.prisma.postData.findMany();
  }

  async findPostById(id: string, i18n?: I18nContext): Promise<PostData> {
    const post = await this.prisma.postData.findUnique({ where: { id } });

    if (!post) {
      const message = i18n
        ? i18n.translate('posts.errors.NOT_FOUND', { args: { id } })
        : `Post with ID ${id} not found`;

      throw new NotFoundException(message);
    }

    return post;
  }

  async create(
    createPostDto: CreatePostDto,
    i18n?: I18nContext,
  ): Promise<{ message: string; post: PostData }> {
    const { title, content } = createPostDto;

    const post = await this.prisma.postData.create({
      data: { title, content },
    });

    const message = i18n
      ? i18n.translate('posts.success.CREATED')
      : 'Post created successfully';

    return { message, post };
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
    i18n?: I18nContext,
  ): Promise<{ message: string; post: PostData }> {
    const post = await this.prisma.postData.findUnique({ where: { id } });

    if (!post) {
      const message = i18n
        ? i18n.translate('posts.errors.NOT_FOUND', { args: { id } })
        : `Post with ID ${id} not found`;

      throw new NotFoundException(message);
    }

    const { title, content } = updatePostDto;

    const updatedPost = await this.prisma.postData.update({
      where: { id },
      data: {
        title: title ?? post.title,
        content: content ?? post.content,
      },
    });

    const message = i18n
      ? i18n.translate('posts.success.UPDATED')
      : 'Post updated successfully';

    return { message, post: updatedPost };
  }

  async delete(id: string, i18n?: I18nContext): Promise<{ message: string }> {
    const post = await this.prisma.postData.findUnique({ where: { id } });

    if (!post) {
      const message = i18n
        ? i18n.translate('posts.errors.NOT_FOUND', { args: { id } })
        : `Post with ID ${id} not found`;

      throw new NotFoundException(message);
    }

    await this.prisma.postData.delete({ where: { id } });

    const message = i18n
      ? i18n.translate('posts.success.DELETED')
      : 'Post deleted successfully';

    return { message };
  }
}
