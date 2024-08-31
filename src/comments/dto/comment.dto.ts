import { IsNumber, IsString } from 'class-validator';

export class commentDto {
  @IsString()
  content: string;

  @IsNumber()
  blogId: number;

  @IsNumber()
  userId: number;
}
