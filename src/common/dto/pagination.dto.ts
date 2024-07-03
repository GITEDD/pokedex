import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Min(1)
  limit?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  offset?: number;
}
