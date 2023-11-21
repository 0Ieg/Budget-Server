import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { db } from 'src/db';

@Injectable()
export class UsersService {
  async findAll() {
    return (await db.query(`select * from users`)).rows;
  }
  async findOne(id: number) {
    return (await db.query(`select * from users where user_id=$1`,[id])).rows;
  }

  async create(createUserDto: CreateUserDto) {
    const {email,password,first_name,last_name,username,created,updated} = createUserDto
    await db.query(`insert into users values ($1,$2,$3,$4,$5,$6,$7)`,[email,password,first_name,last_name,username,created,updated])
    return await this.findAll();
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
