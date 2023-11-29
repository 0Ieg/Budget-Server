import { TransactionsService } from './../transactions.service';
import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class AuthorTransactionGuard implements CanActivate{
  constructor(private readonly transactionsService:TransactionsService) {}
  
  async canActivate(context:ExecutionContext):Promise<any>{
    const request = context.switchToHttp().getRequest()
    const {user_id} = request.user
    const {transaction_id} = request.params
    const isAuthor = (await this.transactionsService.findOne(transaction_id))[0].user_id === user_id
    if(isAuthor){
      return true
    }else{
      throw new NotFoundException('Нельзя взаимодействовать с чужой транзакцией')
    }
    
  }
}