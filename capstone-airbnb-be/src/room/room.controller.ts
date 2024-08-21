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
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { uploadOptions } from 'src/config/upload.config';
import { CreateRoomDto } from './room-dto/room-create-dto';
import { RoomService } from './room.service';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('get-all-rooms')
  async getAllRooms() {
    return await this.roomService.getAllRooms();
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', uploadOptions))
  @ApiBody({
    description: 'Create Room',
    type: CreateRoomDto,
  })
  @Post('create-room')
  async createRoom(
    @UploadedFile() file: Express.Multer.File,
    @Body() createRoomDto: CreateRoomDto,
  ) {
    const photo_url = file.filename;
    return await this.roomService.createRoom(createRoomDto, photo_url);
  }

  @Get('get-room-by-location/:location_id')
  async getRoomByLocation(@Param('location_id') location_id: string) {
    return await this.roomService.getRoomByLocation(location_id);
  }

  @Get('get-room-pagination')
  async getRoomPagination(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
    @Query('keyword') keyword: string,
  ) {
    return await this.roomService.getRoomPagination(
      pageIndex,
      pageSize,
      keyword,
    );
  }

  @Get('get-room-by-id/:room_id')
  async getRoomById(@Param('room_id') room_id: string) {
    return await this.roomService.getRoomById(room_id);
  }

  @Put('update-room/:room_id')
  async updateRoom(
    @Param('room_id') room_id: string,
    @Body() createRoomDto: CreateRoomDto,
  ) {
    return await this.roomService.updateRoom(room_id, createRoomDto);
  }

  @Delete('delete-room/:room_id')
  async deleteRoom(@Param('room_id') room_id: string) {
    return await this.roomService.deleteRoom(room_id);
  }
}
