import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaClient) {}

  async getAllRooms() {
    try {
      const data = await this.prisma.rooms.findMany({
        where: {
          hidden: true,
        },
      });
      return {
        message: 'Rooms retrieved successfully',
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

  async createRoom(createRoomDto, photo_url) {
    try {
      const data = await this.prisma.rooms.create({
        data: {
          ironing_board: createRoomDto.ironing_board === 'true',
          tv: createRoomDto.tv === 'true',
          kitchen: createRoomDto.kitchen === 'true',
          location_id: parseInt(createRoomDto.location_id),
          bathrooms: parseInt(createRoomDto.bathrooms),
          iron: createRoomDto.iron === 'false',
          price: parseFloat(createRoomDto.price),
          washing_machine: createRoomDto.washing_machine === 'true',
          room_name: createRoomDto.room_name,
          beds: parseInt(createRoomDto.beds),
          air_conditioner: createRoomDto.air_conditioner === 'false',
          wifi: createRoomDto.wifi === 'true',
          bedrooms: parseInt(createRoomDto.bedrooms),
          parking: createRoomDto.parking === 'false',
          guests: parseInt(createRoomDto.guests),
          description: createRoomDto.description,
          swimming_pool: createRoomDto.swimming_pool === 'true',
          image: process.env.PORTIMG + photo_url,
        },
      });
      return {
        message: 'Room created successfully',
        data,
        status: HttpStatus.CREATED,
        date: new Date(),
      };
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        error.message || 'An error occurred while processing your request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRoomByLocation(location_id) {
    try {
      const data = await this.prisma.rooms.findMany({
        where: {
          location_id: parseInt(location_id),
        },
      });
      return {
        message: 'Rooms retrieved successfully',
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

  async getRoomPagination(
    pageIndex: number,
    pageSize: number,
    keyword: string,
  ) {
    const pageIndeX = parseInt(pageIndex.toString());
    const pageSizE = parseInt(pageSize.toString());

    const skip = (pageIndeX - 1) * pageSizE;
    const take = pageSizE;
    const where = {
      OR: [{ room_name: { contains: keyword } }],
    };

    const totalCount = await this.prisma.rooms.count({
      where,
    });

    const rooms = await this.prisma.rooms.findMany({
      where,
      skip,
      take,
    });

    return {
      totalCount,
      rooms,
      message: 'Get location pagination successfully',
      status: HttpStatus.OK,
    };
  }

  async getRoomById(room_id) {
    try {
      const data = await this.prisma.rooms.findUnique({
        where: {
          room_id: parseInt(room_id),
        },
      });
      return {
        message: 'Room retrieved successfully',
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

  async updateRoom(room_id, createRoomDto) {
    try {
      const data = await this.prisma.rooms.update({
        where: {
          room_id: parseInt(room_id),
        },
        data: {
          ironing_board: createRoomDto.ironing_board === 'true',
          tv: createRoomDto.tv === 'true',
          kitchen: createRoomDto.kitchen === 'true',
          location_id: parseInt(createRoomDto.location_id),
          bathrooms: parseInt(createRoomDto.bathrooms),
          iron: createRoomDto.iron === 'false',
          price: parseFloat(createRoomDto.price),
          washing_machine: createRoomDto.washing_machine === 'true',
          room_name: createRoomDto.room_name,
          beds: parseInt(createRoomDto.beds),
          air_conditioner: createRoomDto.air_conditioner === 'false',
          wifi: createRoomDto.wifi === 'true',
          bedrooms: parseInt(createRoomDto.bedrooms),
          parking: createRoomDto.parking === 'false',
          guests: parseInt(createRoomDto.guests),
          description: createRoomDto.description,
          swimming_pool: createRoomDto.swimming_pool === 'true',
        },
      });
      return {
        message: 'Room updated successfully',
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

  async deleteRoom(room_id) {
    try {
      const data = await this.prisma.rooms.update({
        where: {
          room_id: parseInt(room_id),
        },
        data: {
          hidden: false,
        },
      });
      return {
        message: 'Room deleted successfully',
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
