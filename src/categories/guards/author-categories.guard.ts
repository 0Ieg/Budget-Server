import { CategoriesService } from './../categories.service';
import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthorCategoriesGuard implements CanActivate{
  constructor(private readonly categoriesService:CategoriesService){}
  async canActivate(context:ExecutionContext):Promise<any>{
    const request = context.switchToHttp().getRequest()
    const {user_id} = request.user
    const {category_id} = request.params
    const isAuthor = (await this.categoriesService.findOne(category_id))[0].user_id===user_id
    if (isAuthor){
      return true
    }else{
      throw new NotFoundException('Нельзя взаимодействовать с чужой категорией')
    }
  }
}