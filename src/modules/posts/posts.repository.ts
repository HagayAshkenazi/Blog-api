import { Injectable } from '@nestjs/common';
import { Post as PostData } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { CreatePostDto } from '@/modules/posts/dto/create-post.dto';
import { UpdatePostDto } from '@/modules/posts/dto/update-post.dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PostData[]> {
    return await this.prisma.post.findMany();
  }

  async find(id: string): Promise<PostData | undefined> {
    return await this.prisma.post.findUniqueOrThrow({ where: { id } });
  }

  async create(data: CreatePostDto): Promise<PostData> {
    return await this.prisma.post.create({ data });
  }

  async update(id: string, data: UpdatePostDto): Promise<PostData> {
    return await this.prisma.post.update({
      data,
      where: { id },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.post.delete({ where: { id } });
  }
}
