import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { db } from 'src/db';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  async findAll() {
    return (await db.query(`select * from users`)).rows;
  }

  async findOneForAuthorization(email: string):Promise<UserDto> {
    const response =  await db.query(`select * from users where user_email=$1`,[email]);
    if (response.rowCount === 0){
      throw new UnauthorizedException('Пользователя с таким email адресом не найдено')
    }else{
      return response.rows[0]
    }   
  }

  async create(createUserDto: CreateUserDto) {
    const {email,password} = createUserDto
    const existUser = (await db.query(`select * from users where user_email=$1`,[email])).rowCount===1
    if(existUser){
      throw new BadRequestException('Данный email уже используется')
    }else{
      const date = new Date()
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds)
      const created = (await db.query(`insert into users(user_email, user_password, user_created, user_updated) values ($1,$2,$3,$4)`,[email, hash, date, date])).rowCount===1
      if (created){
        return 'Вы успешно зарегистрировались'
      }
    }
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
