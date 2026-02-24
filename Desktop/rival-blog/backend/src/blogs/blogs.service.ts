import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto, UpdateBlogDto, CreateCommentDto } from './dto/blog.dto';
import slugify from 'slugify';
import { Prisma } from '@prisma/client';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) { }

  private async generateUniqueSlug(title: string, excludeId?: string): Promise<string> {
    let slug = slugify(title, { lower: true, strict: true, trim: true });
    let suffix = 0;
    let candidateSlug = slug;

    while (true) {
      const existing = await this.prisma.blog.findUnique({
        where: { slug: candidateSlug },
        select: { id: true },
      });

      if (!existing || existing.id === excludeId) break;

      suffix++;
      candidateSlug = `${slug}-${suffix}`;
    }

    return candidateSlug;
  }

  async create(userId: string, dto: CreateBlogDto) {
    const slug = await this.generateUniqueSlug(dto.title);

    const blog = await this.prisma.blog.create({
      data: {
        userId,
        title: dto.title,
        slug,
        content: dto.content,
        summary: dto.summary ?? null,
        isPublished: dto.isPublished ?? false,
        publishedAt: dto.isPublished ? new Date() : null,
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        _count: { select: { likes: true, comments: true } },
      },
    });

    return blog;
  }

  async findAllByUser(userId: string) {
    return this.prisma.blog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { likes: true, comments: true } },
      },
    });
  }

  async findOneByUser(id: string, userId: string) {
    const blog = await this.prisma.blog.findFirst({
      where: { id, userId },
      include: {
        _count: { select: { likes: true, comments: true } },
      },
    });

    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  async update(id: string, userId: string, dto: UpdateBlogDto) {
    const blog = await this.prisma.blog.findUnique({ where: { id } });

    if (!blog) throw new NotFoundException('Blog not found');
    if (blog.userId !== userId) throw new ForbiddenException('Not your blog');

    const updateData: Prisma.BlogUpdateInput = {
      ...(dto.title !== undefined && { title: dto.title }),
      ...(dto.content !== undefined && { content: dto.content }),
      ...(dto.summary !== undefined && { summary: dto.summary }),
      ...(dto.isPublished !== undefined && { isPublished: dto.isPublished }),
    };

    // Update slug if title changed
    if (dto.title && dto.title !== blog.title) {
      updateData.slug = await this.generateUniqueSlug(dto.title, id);
    }

    // Set publishedAt when first publishing
    if (dto.isPublished && !blog.isPublished) {
      updateData.publishedAt = new Date();
    }

    return this.prisma.blog.update({
      where: { id },
      data: updateData,
      include: {
        _count: { select: { likes: true, comments: true } },
      },
    });
  }

  async delete(id: string, userId: string) {
    const blog = await this.prisma.blog.findUnique({ where: { id } });

    if (!blog) throw new NotFoundException('Blog not found');
    if (blog.userId !== userId) throw new ForbiddenException('Not your blog');

    await this.prisma.blog.delete({ where: { id } });
    return { message: 'Blog deleted' };
  }

  // Like system
  async like(blogId: string, userId: string) {
    const blog = await this.prisma.blog.findUnique({
      where: { id: blogId },
      select: { id: true },
    });
    if (!blog) throw new NotFoundException('Blog not found');

    try {
      await this.prisma.like.create({ data: { userId, blogId } });
    } catch (e: unknown) {
      const error = e as { code?: string };
      if (error.code === 'P2002') {
        throw new ConflictException('Already liked');
      }
      throw e;
    }

    const count = await this.prisma.like.count({ where: { blogId } });
    return { liked: true, likeCount: count };
  }

  async unlike(blogId: string, userId: string) {
    const blog = await this.prisma.blog.findUnique({
      where: { id: blogId },
      select: { id: true },
    });
    if (!blog) throw new NotFoundException('Blog not found');

    await this.prisma.like.deleteMany({ where: { userId, blogId } });

    const count = await this.prisma.like.count({ where: { blogId } });
    return { liked: false, likeCount: count };
  }

  async getLikeStatus(blogId: string, userId: string) {
    const like = await this.prisma.like.findUnique({
      where: { userId_blogId: { userId, blogId } },
    });
    const count = await this.prisma.like.count({ where: { blogId } });
    return { liked: !!like, likeCount: count };
  }

  // Comment system
  async createComment(blogId: string, userId: string, dto: CreateCommentDto) {
    const blog = await this.prisma.blog.findUnique({
      where: { id: blogId },
      select: { id: true },
    });
    if (!blog) throw new NotFoundException('Blog not found');

    return this.prisma.comment.create({
      data: { blogId, userId, content: dto.content },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async getComments(blogId: string) {
    return this.prisma.comment.findMany({
      where: { blogId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });
  }
}
