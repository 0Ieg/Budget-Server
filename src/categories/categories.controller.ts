import { Controller, Get, Post, Body, Req, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserDto } from 'src/users/dto/user.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req()req:{user:UserDto}) {
    return this.categoriesService.findAll(req.user.user_id);
    // return req.user
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createCategoryDto: CreateCategoryDto, @Req()req:{user:UserDto}) {
    return this.categoriesService.create(createCategoryDto.category_title, req.user.user_id);
  }

  @Patch(':category_id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  update(@Param('category_id') category_id: string, @Body() updateCategoryDto: UpdateCategoryDto, @Req() req:{user:UserDto}) {
    return this.categoriesService.update(+category_id, updateCategoryDto.category_title,req.user.user_id);
  }

  @Delete(':category_id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('category_id') category_id: string, @Req() req:{user:UserDto}) {
    return this.categoriesService.remove(+category_id, req.user.user_id);
  }
}
