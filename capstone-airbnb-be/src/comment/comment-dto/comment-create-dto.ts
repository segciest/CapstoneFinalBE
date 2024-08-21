import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ type: Number })
  @IsInt()
  @IsPositive()
  @IsOptional()
  room_id: number;

  @ApiProperty({ type: Number })
  @IsInt()
  @IsPositive()
  @IsOptional()
  user_id: number;

  @ApiProperty({ type: Date })
  @IsDateString()
  @IsNotEmpty()
  review_date: Date;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content: string;

  @ApiProperty({ type: Number })
  @IsInt()
  @IsPositive()
  @IsOptional()
  rating: number;
}
