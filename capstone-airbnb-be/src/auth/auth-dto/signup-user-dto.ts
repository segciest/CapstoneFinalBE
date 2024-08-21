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

export class SingUpUserDto {
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
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  password: string;

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

  @IsString()
  @Length(1, 50)
  role: string;

  @IsString()
  refresh_token: string;
}
