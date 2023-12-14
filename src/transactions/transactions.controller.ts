import { UserDto } from './../users/dto/user.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe, Req, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthorTransactionGuard } from './guards/author-transaction.guard';
import { FindAllByTypeDTO } from './dto/findAllByType-transaction.dto';


@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('all')
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req:any) {
    return this.transactionsService.findAll(req.user.id);
  }

  @Get('bytype')
  @UseGuards(JwtAuthGuard) 
  findAllByType(@Req() req:any, @Query() query:FindAllByTypeDTO){
    return this.transactionsService.findAllByType(query.type, req.user.id, )
  }

  @Get('pag')
  @UseGuards(JwtAuthGuard)
  findAllWithPagination(@Req() req:any, @Query('take') take:string, @Query('page') page:string) {
    return this.transactionsService.findAllWithPagination(+take, +page, req.user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: CreateTransactionDto, @Req() req:any) {
    return this.transactionsService.create(body, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AuthorTransactionGuard)
  remove(@Param('id') id:string, @Req() req:any) {
    return this.transactionsService.remove(id, req.user.id);
  }



  // @Patch(':transaction_id')
  // @UseGuards(JwtAuthGuard, AuthorTransactionGuard)
  // @UsePipes( new ValidationPipe())
  // update(@Param('transaction_id') transaction_id: string, @Body() updateTransactionDto: UpdateTransactionDto, @Req()req:{user:UserDto}) {
  //   return this.transactionsService.update(+transaction_id, updateTransactionDto, req.user.user_id);
  // }
}
