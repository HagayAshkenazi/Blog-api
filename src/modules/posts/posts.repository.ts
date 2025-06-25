import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostData } from '@prisma/client';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPosts(): Promise<PostData[]> {
    return this.prisma.postData.findMany();
  }

  async findPostById(id: string): Promise<PostData> {
    const post = await this.prisma.postData.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException({
        message: 'posts.errors.NOT_FOUND',
        args: { id },
      });
    }
    return post;
  }

  async create(
    createPostDto: CreatePostDto,
  ): Promise<{ message: string; post: PostData }> {
    const { title, content } = createPostDto;

    const post = await this.prisma.postData.create({
      data: { title, content },
    });

    return {
      message: 'posts.success.CREATED',
      post,
    };
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<{ message: string; post: PostData }> {
    const post = await this.prisma.postData.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundException({
        message: 'posts.errors.NOT_FOUND',
        args: { id },
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
      message: 'posts.success.UPDATED',
      post: updatedPost,
    };
  }

  async delete(id: string): Promise<{ message: string }> {
    const post = await this.prisma.postData.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundException({
        message: 'posts.errors.NOT_FOUND',
        args: { id },
      });
    }

    await this.prisma.postData.delete({ where: { id } });

    return {
      message: 'posts.success.DELETED',
    };
  }
}
