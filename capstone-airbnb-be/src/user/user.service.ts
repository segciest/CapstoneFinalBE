import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaClient) {}

  async getAllUsers() {
    try {
      const data = await this.prisma.users.findMany({
        where: {
          hidden: true,
        },
        select: {
          name: true,
          email: true,
          phone: true,
          birth_date: true,
          gender: true,
          role: true,
          avatar: true,
        },
      });
      return {
        message: 'Get all user successfully',
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

  async getUserById(user_id: number) {
    try {
      const data = await this.prisma.users.findFirst({
        where: {
          user_id: user_id,
        },
        select: {
          name: true,
          email: true,
          phone: true,
          birth_date: true,
          gender: true,
          role: true,
          avatar: true,
        },
      });
      return {
        message: 'Get user by id successfully',
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

  async searchUserByName(name_user: string) {
    try {
      const data = await this.prisma.users.findMany({
        where: {
          name: {
            contains: name_user,
          },
        },
        select: {
          name: true,
          email: true,
          phone: true,
          birth_date: true,
          gender: true,
          role: true,
          avatar: true,
        },
      });
      if (data.length === 0) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'Get user by name successfully',
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

  async uploadAvatar(user_id: number, photo_url) {
    const userId = parseInt(user_id.toString());
    try {
      const data = await this.prisma.users.update({
        where: {
          user_id: userId,
        },
        data: {
          avatar: process.env.PORTIMG + photo_url,
        },
      });
      return {
        message: 'Upload avatar successfully',
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

  async deleteAvatar(user_id: number) {
    const userId = parseInt(user_id.toString());
    try {
      const data = await this.prisma.users.update({
        where: {
          user_id: userId,
        },
        data: {
          hidden: false,
        },
      });
      return {
        message: 'Delete avatar successfully',
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

  async updateUser(user_id: number, updateUserDto: UpdateUserDto) {
    const userId = parseInt(user_id.toString());
    const { name, email, gender, birth_date, phone } = updateUserDto;
    try {
      try {
        const checkEmail = await this.prisma.users.findFirst({
          where: {
            email: email,
          },
        });
        if (checkEmail) {
          throw new HttpException(
            'Email already exists',
            HttpStatus.BAD_REQUEST,
          );
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
      const formattedDateOfBirth = birth_date
        ? new Date(birth_date).toISOString()
        : null;
      const data = await this.prisma.users.update({
        where: {
          user_id: userId,
        },
        data: {
          name,
          email,
          gender,
          birth_date: formattedDateOfBirth,
          phone,
        },
      });
      return {
        message: 'Update user successfully',
        status: HttpStatus.OK,
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

  async getUserPagination(
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
        { name: { contains: keyword } },
        { email: { contains: keyword } },
        { phone: { contains: keyword } },
      ],
    };

    const totalCount = await this.prisma.users.count({
      where,
    });

    const users = await this.prisma.users.findMany({
      where,
      skip,
      take,
    });

    return {
      totalCount,
      users,
      message: 'Get user pagination successfully',
      status: HttpStatus.OK,
    };
  }
}
