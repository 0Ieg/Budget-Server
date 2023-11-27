import { UserDto } from './../users/dto/user.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes,ValidationPipe, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginationTransactionDto } from './dto/pagination-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req:{user:UserDto}) {
    return this.transactionsService.findAll(req.user.user_id);
  }

  @Get('pag')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  findAllWithPagination(@Req() req:{user:UserDto}, @Body() payload:PaginationTransactionDto) {
    return this.transactionsService.findAllWithPagination(+ req.user.user_id, payload.limit, payload.page);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes( new ValidationPipe())
  create(@Body() createTransactionDto: CreateTransactionDto, @Req() req:{user:UserDto}) {
    return this.transactionsService.create(createTransactionDto, req.user.user_id);
  }

  @Delete(':transaction_id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('transaction_id') id: string, @Req() req:{user:UserDto}) {
    return this.transactionsService.remove(+id, req.user.user_id);
  }

  @Patch(':transaction_id')
  @UseGuards(JwtAuthGuard)
  @UsePipes( new ValidationPipe())
  update(@Param('transaction_id') transaction_id: string, @Body() updateTransactionDto: UpdateTransactionDto, @Req()req:{user:UserDto}) {
    return this.transactionsService.update(+transaction_id, updateTransactionDto, req.user.user_id);
  }
}
