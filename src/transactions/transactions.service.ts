import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { db } from 'src/db';

@Injectable()
export class TransactionsService {
  async findAll(user_id:number) {
    const allUserTransactions = (await db.query('select * from transactions where user_id=$1',[user_id])).rows
    if (allUserTransactions.length){
      return {
        message: `Это все имеющиеся транзакции`,
        allUserTransactions
      }
    }else{
      return {
        message: `Транзакций не найдено`,
        allUserTransactions
      }
    }
  }

  async create(createTransactionDto: CreateTransactionDto, user_id:number) {
    const date = new Date()
    const addedTransaction = await db.query(`insert into transactions(transaction_title, transaction_type, category_id, transaction_amount, user_id, transaction_created, transaction_updated) values($1,$2,$3,$4,$5,$6,$7)`,
    [createTransactionDto.transaction_title, createTransactionDto.transaction_type, createTransactionDto.category_id, createTransactionDto.transaction_amount, user_id, date, date])
    return addedTransaction;
  }


  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
