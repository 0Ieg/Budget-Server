import { IsNotEmpty } from 'class-validator'
export class CreateCategoryDto {
  @IsNotEmpty()
  category_title: string
  @IsNotEmpty()
  user_id: number
}
