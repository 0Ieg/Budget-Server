import { PrismaService } from './../prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  constructor (private readonly prismaService:PrismaService){}
  async getAll(userId:string) {
    return await this.prismaService.category.findMany({where:{userId}})
  }
  async create(userId:string, title:string) {
    const category = await this.prismaService.category.findFirst({where:{userId, title}})
    if (category){
      throw new BadRequestException('The category is already available')
    }else{
      return this.prismaService.category.create({data:{userId, title}})
    }
  }
  async remove(userId:string, id:string){
    return this.prismaService.category.delete({where:{userId, id}})
  }

  async findOne(id: string, userId:string) {
    return this.prismaService.category.findFirst({where:{id, userId}})
  }

  async update(id:string, title:string, userId:string) {
    const category = await this.findOne(id, userId)
    if (category){
      return await this.prismaService.category.update({where:{id, userId}, data:{title}})
    }
    else{
      throw new BadRequestException('Category not found')
    }
  }
}
