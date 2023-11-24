import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { db } from 'src/db';

@Injectable()
export class CategoriesService {
  
  async create(createCategoryDto: CreateCategoryDto) {
    const existCategory = (await db.query('select * from categories where category_title=$1',[createCategoryDto.title])).rowCount===1
    if (existCategory){
      //Категория найдена
      return "Категория уже создана"
    }else{
      //Такой категории еще нет
      const date = new Date()
      const newCategory = (await db.query('insert into categories(category_title, category_created) values ($1,$2) returning *',[createCategoryDto.title, date])).rows[0]
      const newUserCategory = (await db.query('insert into users_categories(user_id, category_id) values ($1,$2) returning *',[createCategoryDto.user_id, newCategory.category_id])).rows
      return newUserCategory
    }
  }

  async findAll() {
    const response = await db.query(`select * from categories`)
    return response.rows
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
