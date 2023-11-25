import { DeleteCategoryDTO } from './dto/delete-category.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { db } from 'src/db';

@Injectable()
export class CategoriesService {
  async findOne(category_id: number) {
    const existsCategory = (await db.query(`select * from categories where category_id=$1`,[category_id])).rowCount===1
    return existsCategory
  }

  async findAll(user_id:number) {
    const allUserCategories = (await db.query(`select * from categories where user_id=$1`,[user_id])).rows
    return allUserCategories
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const existsCategory = (await db.query('select * from categories where category_title=$1 and user_id=$2',[createCategoryDto.category_title, createCategoryDto.user_id])).rowCount===1
    if (existsCategory){
      //Категория уже создана
      const allUserCategories = await this.findAll(createCategoryDto.user_id)
      return {message: `Категория '${createCategoryDto.category_title}' уже создана`, allUserCategories}
      
    }else{
      //Такой категории еще нет
      const date = new Date()
      const categoryCreated = (await db.query('insert into categories(category_title, user_id, category_created, category_updated) values ($1,$2,$3,$4)',[createCategoryDto.category_title, createCategoryDto.user_id, date, date])).rowCount===1
      if (categoryCreated){
        const allUserCategories = await this.findAll(createCategoryDto.user_id)
        return {message: `Категория '${createCategoryDto.category_title}' успешно создана`, allUserCategories}
      }else{
        throw new InternalServerErrorException(`Не удалось создать категорию '${createCategoryDto.category_title}'. Обратитесь в службу поддержки`)
      }
    }
  }

  async update(category_id: number, updateCategoryDto: UpdateCategoryDto) {
    const existsCategory = await this.findOne(category_id)
    if (existsCategory){
      //Категория найдена
      const date2 = new Date()
      const updatedCategory = (await db.query('update categories set category_title=$1, category_updated=$2 where category_id=$3 and user_id=$4',[updateCategoryDto.category_title, date2, category_id, updateCategoryDto.user_id])).rowCount===1
      if(updatedCategory){
        //Категория найдена и обновлена
        const allUserCategories = await this.findAll(updateCategoryDto.user_id)
        return{
          message:`Категория '${updateCategoryDto.category_title}' успешно обновлена`,
          allUserCategories,
        }
      }else{
        //Категория найдена, но не обновлена
        const allUserCategories = await this.findAll(updateCategoryDto.user_id)
        return{
          message:`Не удалось обновить категорию '${updateCategoryDto.category_title}'. Обратитесь в службу поддержки.`,
          allUserCategories,
        }
      }
    }
    else{
      //Категоря не найдена
      const allUserCategories = await this.findAll(updateCategoryDto.user_id)
      return {
        message:`Категория '${updateCategoryDto.category_title}' не найдена`,
        allUserCategories
      }
    }
  }

  async remove(category_id: number, deleteCategoryDTO:DeleteCategoryDTO) {
    const existsCategory = await this.findOne(category_id)
    if (existsCategory){
      //Категория найдена
      const deletedCategory = (await db.query('delete from categories where category_id=$1 and user_id=$2', [category_id, deleteCategoryDTO.user_id])).rowCount===1
      if(deletedCategory){
        //Категория найдена и удалена
        const allUserCategories = await this.findAll(deleteCategoryDTO.user_id)
        return{
          message:`Категория '${deleteCategoryDTO.category_title}' успешно удалена`,
          allUserCategories,
          deletedCategory
        }
      }else{
        //Категория найдена, но не удалена
        return{
          message:`Не удалось удалить категорию '${deleteCategoryDTO.category_title}'. Обратитесь в службу поддержки.`,
        }
      }
    }else{
      //Категоря не найдена
      const allUserCategories = await this.findAll(deleteCategoryDTO.user_id)
      return{
        message:`Категория '${deleteCategoryDTO.category_title}' не найдена`,
        allUserCategories
      }
    }
  }
}
