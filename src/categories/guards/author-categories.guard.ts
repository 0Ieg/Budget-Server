import { CategoriesService } from './../categories.service';
import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthorCategoriesGuard implements CanActivate{
  constructor(private readonly categoriesService:CategoriesService){}
  async canActivate(context:ExecutionContext):Promise<any>{
    const request = context.switchToHttp().getRequest()
    const {id} = request.user
    const {category_id} = request.params
    const category = await this.categoriesService.findOne(category_id)
    if (category?.userId===id){
      return true
    }else{
      throw new NotFoundException('Нельзя взаимодействовать с чужой категорией')
    }
  }
}