import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookingService } from './booking.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBookingDto } from './booking-dto/booking-create-dto';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('get-all-bookings')
  async getAllBookings() {
    return await this.bookingService.getAllBookings();
  }

  @Post('create-booking')
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    return await this.bookingService.createBooking(createBookingDto);
  }

  @Get('get-booking-by-id/:booking_id')
  async getBookingById(@Param('booking_id') booking_id: string) {
    return await this.bookingService.getBookingById(booking_id);
  }

  @Put('update-booking/:booking_id')
  async updateBooking(
    @Param('booking_id') booking_id: string,
    @Body() updateBookingDto: CreateBookingDto,
  ) {
    return await this.bookingService.updateBooking(booking_id, updateBookingDto);
  }

  @Delete('delete-booking/:booking_id')
  async deleteBooking(@Param('booking_id') booking_id: string) {
    return await this.bookingService.deleteBooking(booking_id);
  }

  @Get('get-bookings-by-user/:user_id')
  async getBookingsByUser(@Param('user_id') user_id: string) {
    return await this.bookingService.getBookingsByUser(user_id);
  }
}
