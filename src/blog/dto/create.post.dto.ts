import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsNumber()
  image: string;

  @IsNumber()
  userId: number;
}
