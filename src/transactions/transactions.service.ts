import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';




@Injectable()
export class TransactionsService {
  constructor(private readonly prismaService:PrismaService){}
  async findAll(userId:string) {
    const data = await this.prismaService.$transaction([
      this.prismaService.transaction.findMany({where:{userId}, include:{category:true}, orderBy:{created:'desc'}}),
      this.prismaService.transaction.count({where:{userId}})
    ])
    const total = await this.prismaService.transaction.groupBy({
      by:'type',
      where:{userId},
      _sum:{amount:true}
    })
    const totalIncome = total.find(item=>item.type==='income' && item._sum.amount)?._sum.amount || 0
    const totaExpense = total.find(item=>item.type==='expense' && item._sum.amount)?._sum.amount || 0
    return {transactions:data[0], count:data[1], total:{income:totalIncome, expense:totaExpense}}
  }

  async findAllWithPagination(take:number, page:number, userId:string){
    const skip = (page-1)*take
    const data = await this.prismaService.$transaction([
      this.prismaService.transaction.findMany({take, skip, where:{userId}, include:{category:true}, orderBy:{created:'asc'}}),
      this.prismaService.transaction.count({where:{userId}}),
    ])
    const total = await this.prismaService.transaction.groupBy({
      by: "type",
      where:{userId},
      _sum:{amount:true},
    })
    const totalIncome = total.find(item=>item.type==='income' && item._sum.amount)?._sum.amount || 0
    const totaExpense = total.find(item=>item.type==='expense' && item._sum.amount)?._sum.amount || 0
    return {transactions:data[0], count:data[1], total:{income:totalIncome, expense:totaExpense}}
  }

  async findAllByType(type:'expense'|'income', userId:string){
    return this.prismaService.transaction.findMany({where:{type, userId}})
  }

  async create(body:CreateTransactionDto ,userId:string){
    return this.prismaService.transaction.create({data:{...body, userId}, include:{category:true}})
  }

  async remove( id:string, userId:string){
    return this.prismaService.transaction.delete({where:{id, userId}})
  }

  async findOneByIdOrUserId(id:string, userId:string) {
    return this.prismaService.transaction.findFirst({where:{id, userId}});
  }



  // async create(createTransactionDto: CreateTransactionDto, user_id:number) {
  //   const date = new Date()
  //   const addedTransaction = await db.query(`insert into transactions(transaction_title, transaction_type, category_id, transaction_amount, user_id, transaction_created, transaction_updated) values($1,$2,$3,$4,$5,$6,$7)`,
  //   [createTransactionDto.transaction_title, createTransactionDto.transaction_type, createTransactionDto.category_id, createTransactionDto.transaction_amount, user_id, date, date])
  //   return addedTransaction;
  // }

  // async remove(transaction_id: number, user_id:number) {
  //   const existsTransaction = (await this.findOne(transaction_id)).length
  //   if (existsTransaction){
  //     //Транзакция найдена
  //     const deletedTransaction = (await db.query('delete from transactions where transaction_id=$1',[transaction_id])).rowCount===1
  //     if(deletedTransaction){
  //       //Транзакция найдена и удалена
  //       const allUserTransactions = (await this.findAll(user_id)).allUserTransactions
  //       return {
  //         message: `Транзакция c id=${transaction_id} найдена и удалена`,
  //         allUserTransactions
  //       }
  //     }else{
  //       //Транзакция найдена, но не удалена
  //       const allUserTransactions = (await this.findAll(user_id)).allUserTransactions
  //       return {
  //         message: `Транзакция c id=${transaction_id} найдена, но не удалена. Обратитесь в слубу поддержки.`,
  //         allUserTransactions
  //       }
  //     }
  //   }else{
  //     //Транзакция не найдена
  //     const allUserTransactions = (await this.findAll(user_id)).allUserTransactions
  //     return {
  //       message: `Транзакции c id=${transaction_id} не найдена`,
  //       allUserTransactions
  //     }
  //   }
  // }

  // async update(transaction_id: number, updateTransactionDto: UpdateTransactionDto, user_id:number) {
  //   const existsTransaction = (await this.findOne(transaction_id)).length
  //   if(existsTransaction){
  //     //Транзакция найдена
  //     const date = new Date()
  //     const updatedTransaction = (await db.query('update transactions set transaction_title=$1, transaction_type=$2, category_id=$3, transaction_amount=$4, transaction_updated=$5',
  //     [updateTransactionDto.transaction_title, updateTransactionDto.transaction_type, updateTransactionDto.category_id, updateTransactionDto.transaction_amount, date])).rowCount===1
  //     if(updatedTransaction){
  //       //Транзакция найдена и обновлена
  //       const allUserTransactions = (await this.findAll(user_id)).allUserTransactions
  //       return {
  //         message: `Транзакции c id=${transaction_id} найдена и обновлена`,
  //         allUserTransactions
  //       }
  //     }else{
  //       //Транзакция найдена, но не обновлена
  //       const allUserTransactions = (await this.findAll(user_id)).allUserTransactions
  //       return {
  //         message: `Транзакции c id=${transaction_id}найдена, но не обновлена. Обратитесь в службу поддержки`,
  //         allUserTransactions
  //       }
  //     }
  //   }else{
  //     //Транзакция найден
  //     const allUserTransactions = (await this.findAll(user_id)).allUserTransactions
  //     return {
  //       message: `Транзакции c id=${transaction_id} не найдена`,
  //       allUserTransactions
  //     }
  //   }
  // }
}
