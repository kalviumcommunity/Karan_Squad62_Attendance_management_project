import {
  IsString,
  IsBoolean,
  IsOptional,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  content: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  summary?: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean = false;
}

export class UpdateBlogDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(200)
  title?: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  content?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  summary?: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(2000)
  content: string;
}
