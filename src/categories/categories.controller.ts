import { Controller, Get, Post, Body, Req, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthorCategoriesGuard } from './guards/author-categories.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(@Req() req:any) {
    return this.categoriesService.getAll(req.user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req:any, @Body() body: CreateCategoryDto) {
    return this.categoriesService.create(req.user.id, body.title);
  }

  @Delete(':category_id')
  @UseGuards(JwtAuthGuard, AuthorCategoriesGuard)
  remove(@Req() req:any, @Param('category_id') category_id: string, ) {
    return this.categoriesService.remove(req.user.id, category_id);
  }

  // @Patch(':category_id')
  // @UseGuards(JwtAuthGuard, AuthorCategoriesGuard)
  // @UsePipes(new ValidationPipe())
  // update(@Param('category_id') category_id: string, @Body() updateCategoryDto: UpdateCategoryDto, @Req() req:{user:UserDto}) {
  //   return this.categoriesService.update(+category_id, updateCategoryDto.category_title,req.user.user_id);
  // }
}
