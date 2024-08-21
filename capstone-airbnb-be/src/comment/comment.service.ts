import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaClient) {}

  async getAllComments() {
    try {
      const data = await this.prisma.comments.findMany({
        where: {
          hidden: true,
        },
      });
      return {
        message: 'Comments retrieved successfully',
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

  async createComment(createCommentDto) {
    try {
      const data = await this.prisma.comments.create({
        data: {
          content: createCommentDto.content,
          review_date: new Date(createCommentDto.review_date),
          user_id: parseInt(createCommentDto.user_id),
          room_id: parseInt(createCommentDto.room_id),
          rating: parseInt(createCommentDto.rating),
        },
      });
      return {
        message: 'Comment created successfully',
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

  async updateComment(comment_id, updateCommentDto) {
    try {
      const data = await this.prisma.comments.update({
        where: {
          comment_id: parseInt(comment_id),
        },
        data: {
          content: updateCommentDto.content,
          review_date: new Date(updateCommentDto.review_date),
          user_id: parseInt(updateCommentDto.user_id),
          room_id: parseInt(updateCommentDto.room_id),
          rating: parseInt(updateCommentDto.rating),
        },
      });
      return {
        message: 'Comment updated successfully',
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

  async deleteComment(comment_id) {
    try {
      const data = await this.prisma.comments.update({
        where: {
          comment_id: parseInt(comment_id),
        },
        data: {
          hidden: false,
        },
      });
      return {
        message: 'Comment deleted successfully',
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

  async getComment(comment_id) {
    try {
      const data = await this.prisma.comments.findUnique({
        where: {
          comment_id: parseInt(comment_id),
        },
        include: {
          Users: true,
          Rooms: true,
        },
      });
      return {
        message: 'Comment retrieved successfully',
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
