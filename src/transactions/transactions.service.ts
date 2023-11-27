import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { db } from 'src/db';

@Injectable()
export class TransactionsService {
  async findOne(transaction_id: number) {
    const transaction = (await db.query('select * from transactions where transaction_id=$1',[transaction_id])).rows
    return transaction;
  }

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
  async findAllWithPagination(user_id:number, limit:number, page:number){
    const offset = (page-1)*limit
    const countTransactions = +(await db.query('select count(transaction_id) from transactions where user_id=$1',[user_id])).rows[0].count
    const countPages = Math.ceil(countTransactions/limit)
    const currentPage = (await db.query('select * from transactions join(select transaction_id from transactions where user_id=$1 order by transaction_id limit $2 offset $3) using(transaction_id)',
    [user_id, limit, offset])).rows
    return {countTransactions, countPages, currentPage}
  }

  async create(createTransactionDto: CreateTransactionDto, user_id:number) {
    const date = new Date()
    const addedTransaction = await db.query(`insert into transactions(transaction_title, transaction_type, category_id, transaction_amount, user_id, transaction_created, transaction_updated) values($1,$2,$3,$4,$5,$6,$7)`,
    [createTransactionDto.transaction_title, createTransactionDto.transaction_type, createTransactionDto.category_id, createTransactionDto.transaction_amount, user_id, date, date])
    return addedTransaction;
  }

  async remove(transaction_id: number, user_id:number) {
    const existsTransaction = (await this.findOne(transaction_id)).length
    if (existsTransaction){
      //Транзакция найдена
      const deletedTransaction = (await db.query('delete from transactions where transaction_id=$1',[transaction_id])).rowCount===1
      if(deletedTransaction){
        //Транзакция найдена и удалена
        const allUserTransactions = (await this.findAll(user_id)).allUserTransactions
        return {
          message: `Транзакция c id=${transaction_id} найдена и удалена`,
          allUserTransactions
        }
      }else{
        //Транзакция найдена, но не удалена
        const allUserTransactions = (await this.findAll(user_id)).allUserTransactions
        return {
          message: `Транзакция c id=${transaction_id} найдена, но не удалена. Обратитесь в слубу поддержки.`,
          allUserTransactions
        }
      }
    }else{
      //Транзакция не найдена
      const allUserTransactions = (await this.findAll(user_id)).allUserTransactions
      return {
        message: `Транзакции c id=${transaction_id} не найдена`,
        allUserTransactions
      }
    }
  }

  async update(transaction_id: number, updateTransactionDto: UpdateTransactionDto, user_id:number) {
    const existsTransaction = (await this.findOne(transaction_id)).length
    if(existsTransaction){
      //Транзакция найдена
      const date = new Date()
      const updatedTransaction = (await db.query('update transactions set transaction_title=$1, transaction_type=$2, category_id=$3, transaction_amount=$4, transaction_updated=$5',
      [updateTransactionDto.transaction_title, updateTransactionDto.transaction_type, updateTransactionDto.category_id, updateTransactionDto.transaction_amount, date])).rowCount===1
      if(updatedTransaction){
        //Транзакция найдена и обновлена
        const allUserTransactions = (await this.findAll(user_id)).allUserTransactions
        return {
          message: `Транзакции c id=${transaction_id} найдена и обновлена`,
          allUserTransactions
        }
      }else{
        //Транзакция найдена, но не обновлена
        const allUserTransactions = (await this.findAll(user_id)).allUserTransactions
        return {
          message: `Транзакции c id=${transaction_id}найдена, но не обновлена. Обратитесь в службу поддержки`,
          allUserTransactions
        }
      }
    }else{
      //Транзакция найден
      const allUserTransactions = (await this.findAll(user_id)).allUserTransactions
      return {
        message: `Транзакции c id=${transaction_id} не найдена`,
        allUserTransactions
      }
    }
  }
}
