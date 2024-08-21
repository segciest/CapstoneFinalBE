import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaClient } from '@prisma/client';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [JwtModule, AuthModule],
  controllers: [UserController],
  providers: [UserService, PrismaClient],
})
export class UserModule {}
