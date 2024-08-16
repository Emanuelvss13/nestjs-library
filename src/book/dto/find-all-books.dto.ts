import { IsOptional, IsString, IsUUID } from 'class-validator';

export class FindAllDto {
  @IsOptional()
  @IsUUID()
  authorId?: string;

  @IsOptional()
  @IsUUID()
  genderId?: string;

  @IsOptional()
  @IsString()
  publishedYear?: string;
}
