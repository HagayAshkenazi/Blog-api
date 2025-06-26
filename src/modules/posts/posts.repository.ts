import { Injectable } from '@nestjs/common';

import { PostData } from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAllPosts(): Promise<PostData[]> {
    return this.prisma.postData.findMany();
  }

  findPostById(id: string): Promise<PostData | null> {
    return this.prisma.postData.findUnique({ where: { id } });
  }

  create(data: CreatePostDto): Promise<PostData> {
    return this.prisma.postData.create({ data });
  }

  update(id: string, data: UpdatePostDto): Promise<PostData> {
    return this.prisma.postData.update({
      where: { id },
      data,
    });
  }

  delete(id: string): Promise<PostData> {
    return this.prisma.postData.delete({ where: { id } });
  }
}
