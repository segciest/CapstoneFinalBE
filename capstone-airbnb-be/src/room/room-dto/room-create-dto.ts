import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  room_name: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ type: Number })
  @IsInt()
  @IsPositive()
  @IsOptional()
  guests: number;

  @ApiProperty({ type: Number })
  @IsInt()
  @IsPositive()
  @IsOptional()
  bedrooms: number;

  @ApiProperty({ type: Number })
  @IsInt()
  @IsPositive()
  @IsOptional()
  beds: number;

  @ApiProperty({ type: Number })
  @IsInt()
  @IsPositive()
  @IsOptional()
  bathrooms: number;

  @ApiProperty({ type: Number })
  @IsInt()
  @IsPositive()
  @IsOptional()
  price: number;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  washing_machine: boolean;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  iron: boolean;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  tv: boolean;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  air_conditioner: boolean;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  wifi: boolean;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  kitchen: boolean;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  parking: boolean;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  swimming_pool: boolean;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  ironing_board: boolean;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: string;

  @ApiProperty({ type: Number })
  @IsInt()
  @IsOptional()
  location_id: number;
}
