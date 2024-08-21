import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadOptions } from 'src/config/upload.config';
import { LocationPostDto } from './location-dto/location-post-dto';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('get-all-locations')
  async getAllLocations() {
    return this.locationService.getAllLocations();
  }

  @Post('upload-location')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', uploadOptions))
  async createLocation(
    @UploadedFile() file: Express.Multer.File,
    @Body() locationPostDto: LocationPostDto,
  ) {
    const photo_url = file.filename;
    return this.locationService.createLocation(locationPostDto, photo_url);
  }

  @Get('get-location-pagination')
  async getLocationPagination(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
    @Query('keyword') keyword: string,
  ) {
    return this.locationService.getLocationPagination(
      pageIndex,
      pageSize,
      keyword,
    );
  }

  @Get('get-location-by-id/:location_id')
  async getLocationById(@Param('location_id') location_id: number) {
    return this.locationService.getLocationById(location_id);
  }

  @Put('update-location/:location_id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', uploadOptions))
  async updateLocation(
    @UploadedFile() file: Express.Multer.File,
    @Param('location_id') location_id: number,
    @Body() locationPostDto: LocationPostDto,
  ) {
    const photo_url = file.filename;
    return this.locationService.updateLocation(
      location_id,
      locationPostDto,
      photo_url,
    );
  }

  @Delete('delete-location/:location_id')
  async deleteLocation(@Param('location_id') location_id: number) {
    return this.locationService.deleteLocation(location_id);
  }
}
