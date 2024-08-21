import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Length(1, 100)
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  gender?: number;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  birth_date?: Date;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  phone?: string;
}
