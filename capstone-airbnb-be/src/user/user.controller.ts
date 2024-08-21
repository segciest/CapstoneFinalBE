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
import { UserService } from './user.service';
import { UploadAvatarDto } from 'src/config/dto/upload-avatar-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-all-users')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('get-user-by-id')
  async getUserById(@Param('User_id') user_id: number) {
    return this.userService.getUserById(user_id);
  }

  @Get('search-user-by-name/:name_user')
  async searchUserByName(@Param('name_user') name_user: string) {
    return this.userService.searchUserByName(name_user);
  }

  @Post('upload-avatar/:user_id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', uploadOptions))
  @ApiBody({
    description: 'Upload avatar',
    type: UploadAvatarDto,
  })
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param('user_id') user_id: number,
  ) {
    const photo_url = file.filename;
    return this.userService.uploadAvatar(user_id, photo_url);
  }

  @Delete('delete-avatar/:user_id')
  async deleteAvatar(@Param('user_id') user_id: number) {
    return this.userService.deleteAvatar(user_id);
  }

  @Put('update-user/:user_id')
  async updateUser(
    @Param('user_id') user_id: number,
    @Body() UpdateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(user_id, UpdateUserDto);
  }

  @Get('get-user-pagination')
  async getUserPagination(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
    @Query('keyword') keyword: string,
  ) {
    return this.userService.getUserPagination(pageIndex, pageSize, keyword);
  }
}
