import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { PrismaService } from '../prisma/prisma.service';
import { IsInt, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

class FeedQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 12;
}

@Controller('public')
export class PublicController {
  constructor(private prisma: PrismaService) {}

  @Get('feed')
  @Throttle({ global: { limit: 60, ttl: 60000 } })
  async getFeed(@Query() query: FeedQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 12;
    const skip = (page - 1) * limit;

    // Optimized single query with aggregations — no N+1
    const [blogs, total] = await Promise.all([
      this.prisma.blog.findMany({
        where: { isPublished: true },
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          summary: true,
          publishedAt: true,
          createdAt: true,
          user: {
            select: { id: true, name: true, email: true },
          },
          _count: {
            select: { likes: true, comments: true },
          },
        },
      }),
      this.prisma.blog.count({ where: { isPublished: true } }),
    ]);

    return {
      data: blogs.map((b) => ({
        id: b.id,
        title: b.title,
        slug: b.slug,
        summary: b.summary,
        publishedAt: b.publishedAt,
        author: b.user,
        likeCount: b._count.likes,
        commentCount: b._count.comments,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  }

  @Get('blogs/:slug')
  @Throttle({ global: { limit: 120, ttl: 60000 } })
  async getBlogBySlug(@Param('slug') slug: string) {
    const blog = await this.prisma.blog.findFirst({
      where: { slug, isPublished: true },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        summary: true,
        publishedAt: true,
        createdAt: true,
        user: {
          select: { id: true, name: true, email: true },
        },
        _count: { select: { likes: true, comments: true } },
      },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    return {
      ...blog,
      author: blog.user,
      likeCount: blog._count.likes,
      commentCount: blog._count.comments,
    };
  }
}
