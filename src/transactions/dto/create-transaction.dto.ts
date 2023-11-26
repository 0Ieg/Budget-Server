import { IsNumber, IsString, IsNotEmpty} from "class-validator"

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
	transaction_title:string

  @IsNotEmpty()
  @IsString()
	transaction_type: 'income'|'expense'

  @IsNotEmpty()
  @IsNumber()
	category_id:number

  @IsNotEmpty()
  @IsNumber()
	transaction_amount:number
}
