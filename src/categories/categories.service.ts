import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { db } from 'src/db';

@Injectable()
export class CategoriesService {
  async findOne(category_id: number) {
    const category = (await db.query(`select * from categories where category_id=$1`,[category_id])).rows
    return category
  }

  async findAll(user_id:number) {
    const allUserCategories = (await db.query(`select * from categories where user_id=$1`,[user_id])).rows
    return allUserCategories
  }

  async create(category_title:string, user_id:number) {
    const existsCategory = (await db.query('select * from categories where category_title=$1 and user_id=$2',[category_title, user_id])).rowCount===1
    if (existsCategory){
      //Категория уже создана
      const allUserCategories = await this.findAll(user_id)
      return {message: `Категория '${category_title}' уже создана`, allUserCategories}
    }else{
      //Такой категории еще нет
      const date = new Date()
      const categoryCreated = (await db.query('insert into categories(category_title, user_id, category_created, category_updated) values ($1,$2,$3,$4)',[category_title, user_id, date, date])).rowCount===1
      if (categoryCreated){
        const allUserCategories = await this.findAll(user_id)
        return {message: `Категория '${category_title}' успешно создана`, allUserCategories}
      }else{
        throw new InternalServerErrorException(`Не удалось создать категорию '${category_title}'. Обратитесь в службу поддержки`)
      }
    }
  }

  async update(category_id: number, category_title:string, user_id:number) {
    const existsCategory = await this.findOne(category_id)
    if (existsCategory.length){
      //Категория найдена
      const date2 = new Date()
      const updatedCategory = (await db.query('update categories set category_title=$1, category_updated=$2 where category_id=$3 and user_id=$4',[category_title, date2, category_id, user_id])).rowCount===1
      if(updatedCategory){
        //Категория найдена и обновлена
        const allUserCategories = await this.findAll(user_id)
        return{
          message:`Категория '${category_title}' успешно обновлена`,
          allUserCategories,
        }
      }else{
        //Категория найдена, но не обновлена
        const allUserCategories = await this.findAll(user_id)
        return{
          message:`Не удалось обновить категорию '${category_title}'. Обратитесь в службу поддержки.`,
          allUserCategories,
        }
      }
    }
    else{
      //Категоря не найдена
      const allUserCategories = await this.findAll(user_id)
      return {
        message:`Категория '${category_title}' не найдена`,
        allUserCategories
      }
    }
  }

  async remove(category_id: number, user_id:number) {
    const existsCategory = await this.findOne(category_id)
    if (existsCategory.length){
      //Категория найдена
      const deletedCategory = (await db.query('delete from categories where category_id=$1 and user_id=$2', [category_id, user_id])).rowCount===1
      if(deletedCategory){
        //Категория найдена и удалена
        const allUserCategories = await this.findAll(user_id)
        return{
          message:`Категория '${existsCategory[0].category_title}' успешно удалена`,
          allUserCategories,
          deletedCategory
        }
      }else{
        //Категория найдена, но не удалена
        return{
          message:`Не удалось удалить категорию '${existsCategory[0].category_title}'. Обратитесь в службу поддержки.`,
        }
      }
    }else{
      //Категоря не найдена
      const allUserCategories = await this.findAll(user_id)
      return{
        message:`Категория '${existsCategory[0].category_title}' не найдена`,
        allUserCategories
      }
    }
  }
}
