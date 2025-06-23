import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostData } from 'generated/prisma';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPosts(): Promise<PostData[]> {
    return this.prisma.postData.findMany();
  }

  async findPostById(id: string): Promise<PostData> {
    const post = await this.prisma.postData.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async create(createPostDto: CreatePostDto): Promise<PostData> {
    const { title, content, publishTime } = createPostDto;

    return this.prisma.postData.create({
      data: { title, content, publishTime },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<PostData> {
    const post = await this.prisma.postData.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    const { title, content } = updatePostDto;

    return this.prisma.postData.update({
      where: { id },
      data: {
        title: title ?? post.title,
        content: content ?? post.content,
      },
    });
  }

  async delete(id: string): Promise<void> {
    const post = await this.prisma.postData.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    await this.prisma.postData.delete({ where: { id } });
  }
}
