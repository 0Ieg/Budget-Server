import { IsEnum, IsNotEmpty} from "class-validator";

enum TransactionsTypes{expense='expense', income='income'}
export class FindAllByTypeDTO {
  @IsNotEmpty()
  @IsEnum(TransactionsTypes)
  type:'expense'|'income'
}
