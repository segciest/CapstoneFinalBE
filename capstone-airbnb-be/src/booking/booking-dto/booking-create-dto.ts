import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ type: Number })
  @IsInt()
  room_id: number;

  @ApiProperty({ type: Date })
  @IsDateString()
  @IsOptional()
  check_in_date?: Date;

  @ApiProperty({ type: Date })
  @IsDateString()
  @IsOptional()
  check_out_date?: Date;

  @ApiProperty({ type: Number })
  @IsInt()
  @IsOptional()
  guest_count?: number;

  @ApiProperty({ type: Number })
  @IsInt()
  @IsOptional()
  user_id?: number;
}
