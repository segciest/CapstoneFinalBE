import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { MulterModule } from '@nestjs/platform-express';
import { uploadOptions } from 'src/config/upload.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [MulterModule.register(uploadOptions), JwtModule, AuthModule],
  controllers: [RoomController],
  providers: [RoomService, PrismaClient],
})
export class RoomModule {}
