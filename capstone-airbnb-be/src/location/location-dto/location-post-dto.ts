import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LocationPostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: string;
}
