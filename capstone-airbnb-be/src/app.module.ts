import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from './user/user.module';
import { LocationModule } from './location/location.module';
import { RoomModule } from './room/room.module';
import { BookingModule } from './booking/booking.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserModule, LocationModule, RoomModule, BookingModule, CommentModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
