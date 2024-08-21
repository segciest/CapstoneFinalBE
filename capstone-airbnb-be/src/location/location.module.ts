import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { PrismaClient } from '@prisma/client';
import { MulterModule } from '@nestjs/platform-express';
import { uploadOptions } from 'src/config/upload.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MulterModule.register(uploadOptions), JwtModule, AuthModule],
  controllers: [LocationController],
  providers: [LocationService, PrismaClient],
})
export class LocationModule {}
