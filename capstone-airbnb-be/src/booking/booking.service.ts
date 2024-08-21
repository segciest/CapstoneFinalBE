import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaClient) {}

  async getAllBookings() {
    try {
      const data = await this.prisma.bookings.findMany({
        where: {
          hidden: true,
        },
      });
      return {
        message: 'Bookings retrieved successfully',
        data,
        status: HttpStatus.OK,
        date: new Date(),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        error.message || 'An error occurred while processing your request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createBooking(createBookingDto) {
    try {
      const data = await this.prisma.bookings.create({
        data: {
          room_id: parseInt(createBookingDto.room_id),
          check_in_date: new Date(createBookingDto.check_in_date),
          check_out_date: new Date(createBookingDto.check_out_date),
          guest_count: parseInt(createBookingDto.guest_count),
          user_id: parseInt(createBookingDto.user_id),
        },
      });
      return {
        message: 'Booking created successfully',
        data,
        status: HttpStatus.CREATED,
        date: new Date(),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        error.message || 'An error occurred while processing your request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getBookingById(booking_id: string) {
    try {
      const data = await this.prisma.bookings.findUnique({
        where: {
          booking_id: parseInt(booking_id),
        },
        include: {
          Rooms: true,
          Users: true,
        },
      });

      return {
        message: 'Booking retrieved successfully',
        data,
        status: HttpStatus.OK,
        date: new Date(),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        error.message || 'An error occurred while processing your request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateBooking(booking_id: string, updateBookingDto) {
    try {
      const data = await this.prisma.bookings.update({
        where: {
          booking_id: parseInt(booking_id),
        },
        data: {
          room_id: parseInt(updateBookingDto.room_id),
          check_in_date: new Date(updateBookingDto.check_in_date),
          check_out_date: new Date(updateBookingDto.check_out_date),
          guest_count: parseInt(updateBookingDto.guest_count),
          user_id: parseInt(updateBookingDto.user_id),
        },
      });

      return {
        message: 'Booking updated successfully',
        data,
        status: HttpStatus.OK,
        date: new Date(),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        error.message || 'An error occurred while processing your request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteBooking(booking_id: string) {
    try {
      const data = await this.prisma.bookings.update({
        where: {
          booking_id: parseInt(booking_id),
        },
        data: {
          hidden: false,
        },
      });

      return {
        message: 'Booking deleted successfully',
        data,
        status: HttpStatus.OK,
        date: new Date(),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        error.message || 'An error occurred while processing your request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getBookingsByUser(user_id: string) {
    try {
      const data = await this.prisma.bookings.findMany({
        where: {
          user_id: parseInt(user_id),
        },
        include: {
          Rooms: true,
          Users: true,
        },
      });

      return {
        message: 'Bookings retrieved successfully',
        data,
        status: HttpStatus.OK,
        date: new Date(),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        error.message || 'An error occurred while processing your request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
