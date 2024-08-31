import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto {
  @IsOptional()
  @IsString()
  content: string;

  @IsNumber()
  id: number;
}
