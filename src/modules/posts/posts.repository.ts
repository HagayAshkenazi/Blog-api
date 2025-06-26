import { Injectable } from '@nestjs/common';

import { PostData } from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPosts(): Promise<PostData[]> {
    return await this.prisma.postData.findMany();
  }

  async findPostById(id: string): Promise<PostData | null> {
    return await this.prisma.postData.findUnique({ where: { id } });
  }

  async create(data: CreatePostDto): Promise<PostData> {
    return await this.prisma.postData.create({ data });
  }

  async update(id: string, data: UpdatePostDto): Promise<PostData> {
    return await this.prisma.postData.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<PostData> {
    return await this.prisma.postData.delete({ where: { id } });
  }
}
