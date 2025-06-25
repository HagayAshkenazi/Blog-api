import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostData } from '@prisma/client';
import { I18nService, I18nContext } from 'nestjs-i18n';

@Injectable()
export class PostsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
  ) {}

  async findAllPosts(): Promise<PostData[]> {
    return this.prisma.postData.findMany();
  }

  async findPostById(id: string, i18nContext: I18nContext): Promise<PostData> {
    const post = await this.prisma.postData.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException({
        message: await this.i18n.translate('posts.errors.NOT_FOUND', {
          lang: i18nContext.lang,
          args: { id },
        }),
      });
    }
    return post;
  }

  async create(
    createPostDto: CreatePostDto,
    i18nContext: I18nContext,
  ): Promise<{ message: string; post: PostData }> {
    const { title, content } = createPostDto;

    const post = await this.prisma.postData.create({
      data: { title, content },
    });

    return {
      message: await this.i18n.translate('posts.success.CREATED', {
        lang: i18nContext.lang,
      }),
      post,
    };
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
    i18nContext: I18nContext,
  ): Promise<{ message: string; post: PostData }> {
    const post = await this.prisma.postData.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundException({
        message: await this.i18n.translate('posts.errors.NOT_FOUND', {
          lang: i18nContext.lang,
          args: { id },
        }),
      });
    }

    const { title, content } = updatePostDto;

    const updatedPost = await this.prisma.postData.update({
      where: { id },
      data: {
        title: title ?? post.title,
        content: content ?? post.content,
      },
    });

    return {
      message: await this.i18n.translate('posts.success.UPDATED', {
        lang: i18nContext.lang,
      }),
      post: updatedPost,
    };
  }

  async delete(id: string, i18nContext: I18nContext): Promise<{ message: string }> {
    const post = await this.prisma.postData.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundException({
        message: await this.i18n.translate('posts.errors.NOT_FOUND', {
          lang: i18nContext.lang,
          args: { id },
        }),
      });
    }

    await this.prisma.postData.delete({ where: { id } });

    return {
      message: await this.i18n.translate('posts.success.DELETED', {
        lang: i18nContext.lang,
      }),
    };
  }
}
