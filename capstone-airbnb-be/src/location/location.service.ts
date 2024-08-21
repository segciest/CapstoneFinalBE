import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaClient) {}

  async getAllLocations() {
    try {
      const data = await this.prisma.locations.findMany({
        where: {
          hidden: true,
        },
      });
      return {
        message: 'Locations retrieved successfully',
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

  async createLocation(locationPostDto, photo_url) {
    const { location_name, city, country } = locationPostDto;
    try {
      const data = await this.prisma.locations.create({
        data: {
          location_name,
          city,
          country,
          image: process.env.PORTIMG + photo_url,
        },
      });
      if (data) {
        return {
          message: 'Location created successfully',
          status: HttpStatus.OK,
          date: new Date(),
        };
      }
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

  async getLocationPagination(
    pageIndex: number,
    pageSize: number,
    keyword: string,
  ) {
    const pageIndeX = parseInt(pageIndex.toString());
    const pageSizE = parseInt(pageSize.toString());

    const skip = (pageIndeX - 1) * pageSizE;
    const take = pageSizE;
    const where = {
      OR: [
        { location_name: { contains: keyword } },
        { city: { contains: keyword } },
        { country: { contains: keyword } },
      ],
    };

    const totalCount = await this.prisma.locations.count({
      where,
    });

    const locations = await this.prisma.locations.findMany({
      where,
      skip,
      take,
    });

    return {
      totalCount,
      locations,
      message: 'Get location pagination successfully',
      status: HttpStatus.OK,
    };
  }

  async getLocationById(location_id: number) {
    const location_id_number = Number(location_id);
    try {
      const data = await this.prisma.locations.findFirst({
        where: {
          location_id: location_id_number,
        },
      });
      return {
        message: 'Location retrieved successfully',
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

  async updateLocation(location_id: number, locationPostDto, photo_url) {
    const { location_name, city, country } = locationPostDto;
    const location_id_number = Number(location_id);
    try {
      const data = await this.prisma.locations.update({
        where: {
          location_id: location_id_number,
        },
        data: {
          location_name,
          city,
          country,
          image: process.env.PORTIMG + photo_url,
        },
      });
      if (data) {
        return {
          message: 'Location updated successfully',
          status: HttpStatus.OK,
          date: new Date(),
        };
      }
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

  async deleteLocation(location_id: number) {
    const location_id_number = Number(location_id);
    try {
      const data = await this.prisma.locations.update({
        where: {
          location_id: location_id_number,
        },
        data: {
          hidden: false,
        },
      });
      if (data) {
        return {
          message: 'Location deleted successfully',
          status: HttpStatus.OK,
          date: new Date(),
        };
      }
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
