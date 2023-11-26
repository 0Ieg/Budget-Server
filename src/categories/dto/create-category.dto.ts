import { IsNotEmpty, IsString, } from 'class-validator'
export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString({message:'Заголовком категории может быть только строка'})
  category_title: string
}
