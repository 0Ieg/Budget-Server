import { IsNotEmpty, IsNumber } from "class-validator"

export class PaginationTransactionDto{
  @IsNotEmpty()
  @IsNumber()
  limit:number
  
  @IsNotEmpty()
  @IsNumber()
  page:number
}