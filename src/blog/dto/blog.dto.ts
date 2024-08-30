import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class createBlogDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsObject()
  image: string;
}

export class UserBlog {
  @IsNumber()
  userId: number;

  @IsNumber()
  id: number;
}
