import { Injectable } from '@nestjs/common';

import { Post as PostData } from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPosts(): Promise<PostData[]> {
    return await this.prisma.post.findMany();
  }

  async findPostById(id: string): Promise<PostData | null> {
    return await this.prisma.post.findUnique({ where: { id } });
  }

  async create(data: CreatePostDto): Promise<PostData> {
    return await this.prisma.post.create({ data });
  }

  async update(id: string, data: UpdatePostDto): Promise<PostData> {
    return await this.prisma.post.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<PostData> {
    return await this.prisma.post.delete({ where: { id } });
  }
}
