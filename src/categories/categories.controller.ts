import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DeleteCategoryDTO } from './dto/delete-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }
  
  @Get(':id')
  findAll(@Param('id') id:string) {
    return this.categoriesService.findAll(+id);
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Patch(':category_id')
  update(@Param('category_id') category_id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+category_id, updateCategoryDto);
  }
  @Delete(':id')
  remove(@Param('id') category_id: string, @Body() deleteCategoryDTO:DeleteCategoryDTO) {
    return this.categoriesService.remove(+category_id, deleteCategoryDTO);
  }
}
