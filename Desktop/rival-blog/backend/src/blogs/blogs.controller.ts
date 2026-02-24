import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser, CurrentUserData } from '../common/current-user.decorator';
import { BlogsService } from './blogs.service';
import { CreateBlogDto, UpdateBlogDto, CreateCommentDto } from './dto/blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @CurrentUser() user: CurrentUserData,
    @Body() dto: CreateBlogDto,
  ) {
    return this.blogsService.create(user.id, dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user: CurrentUserData) {
    return this.blogsService.findAllByUser(user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.blogsService.findOneByUser(id, user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserData,
    @Body() dto: UpdateBlogDto,
  ) {
    return this.blogsService.update(id, user.id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.blogsService.delete(id, user.id);
  }

  // Like endpoints (auth required)
  @Post(':id/like')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  like(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.blogsService.like(id, user.id);
  }

  @Delete(':id/like')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  unlike(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.blogsService.unlike(id, user.id);
  }

  @Get(':id/like')
  @UseGuards(JwtAuthGuard)
  likeStatus(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.blogsService.getLikeStatus(id, user.id);
  }

  // Comment endpoints
  @Post(':id/comments')
  @UseGuards(JwtAuthGuard)
  createComment(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserData,
    @Body() dto: CreateCommentDto,
  ) {
    return this.blogsService.createComment(id, user.id, dto);
  }

  // Public - no auth required for reading comments
  @Get(':id/comments')
  getComments(@Param('id') id: string) {
    return this.blogsService.getComments(id);
  }
}
