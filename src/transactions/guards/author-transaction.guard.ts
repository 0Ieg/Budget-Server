import { TransactionsService } from './../transactions.service';
import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class AuthorTransactionGuard implements CanActivate{
  constructor(private readonly transactionsService:TransactionsService) {}
  
  async canActivate(context:ExecutionContext):Promise<any>{
    const request = context.switchToHttp().getRequest()
    const userId = await request.user.id
    const {id} = request.params
    const transaction = await this.transactionsService.findOneByIdOrUserId(id, userId)
    if(transaction){
      return true
    }else{
      throw new NotFoundException('Transaction not found')
    }
  }
}