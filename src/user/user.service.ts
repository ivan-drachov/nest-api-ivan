import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  
  constructor(private prisma: PrismaService) {}

  async editUser(
    userId: number,
    dto: EditUserDto,
  ) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.hash;

    return user;
  }

  async getUserByID(userId: number){
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId
      }
    })
    if (!user) throw new HttpException(
      'User not found', 404
    );
    return user;
  }

  async getUsers(){
    const users = await this.prisma.user.findMany()
    return users
  }
}
