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
      throw new BadRequestException('Такая категория уже есть')
    }else{
      return this.prismaService.category.create({data:{userId, title}})
    }
  }
  async remove(userId:string, id:string){
    return this.prismaService.category.delete({where:{userId, id}})
  }

  async findOne(id: string) {
    return this.prismaService.category.findFirst({where:{id}})
  }

  // async update(category_id: number, category_title:string, user_id:number) {
  //   const existsCategory = await this.findOne(category_id)
  //   if (existsCategory.length){
  //     //Категория найдена
  //     const date2 = new Date()
  //     const updatedCategory = (await db.query('update categories set category_title=$1, category_updated=$2 where category_id=$3 and user_id=$4',[category_title, date2, category_id, user_id])).rowCount===1
  //     if(updatedCategory){
  //       //Категория найдена и обновлена
  //       const allUserCategories = await this.findAll(user_id)
  //       return{
  //         message:`Категория '${category_title}' успешно обновлена`,
  //         allUserCategories,
  //       }
  //     }else{
  //       //Категория найдена, но не обновлена
  //       const allUserCategories = await this.findAll(user_id)
  //       return{
  //         message:`Не удалось обновить категорию '${category_title}'. Обратитесь в службу поддержки.`,
  //         allUserCategories,
  //       }
  //     }
  //   }
  //   else{
  //     //Категоря не найдена
  //     const allUserCategories = await this.findAll(user_id)
  //     return {
  //       message:`Категория '${category_title}' не найдена`,
  //       allUserCategories
  //     }
  //   }
  // }

  // async remove(category_id: number, user_id:number) {
  //   const existsCategory = await this.findOne(category_id)
  //   if (existsCategory.length){
  //     //Категория найдена
  //     const deletedCategory = (await db.query('delete from categories where category_id=$1 and user_id=$2', [category_id, user_id])).rowCount===1
  //     if(deletedCategory){
  //       //Категория найдена и удалена
  //       const allUserCategories = await this.findAll(user_id)
  //       return{
  //         message:`Категория '${existsCategory[0].category_title}' успешно удалена`,
  //         allUserCategories,
  //         deletedCategory
  //       }
  //     }else{
  //       //Категория найдена, но не удалена
  //       return{
  //         message:`Не удалось удалить категорию '${existsCategory[0].category_title}'. Обратитесь в службу поддержки.`,
  //       }
  //     }
  //   }else{
  //     //Категоря не найдена
  //     const allUserCategories = await this.findAll(user_id)
  //     return{
  //       message:`Категория '${existsCategory[0].category_title}' не найдена`,
  //       allUserCategories
  //     }
  //   }
  // }
}
