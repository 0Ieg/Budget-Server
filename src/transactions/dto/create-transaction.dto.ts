import { IsNumber, IsString, IsNotEmpty} from "class-validator"

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
	title:string

  @IsNotEmpty()
  @IsString()
	type: 'income'|'expense'

  @IsNotEmpty()
  @IsString()
	categoryId:string

  @IsNotEmpty()
  @IsNumber()
	amount:number
}
