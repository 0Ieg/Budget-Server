import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(private readonly prismaService:PrismaService, private readonly jwtService:JwtService){}
  private async hashingPassword(password:string){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }
  async findOneById(id:string){
    return this.prismaService.user.findFirst({where:{id}})
  }
  async findOneByEmail(email:string){
    return this.prismaService.user.findFirst({where:{email}})
  }
  async findOneByIdOrEmail(idOrEmail:string){
    return this.prismaService.user.findFirst({where:{OR:[{email:idOrEmail},{id:idOrEmail}]}})
  }
  async findAll() {
    return this.prismaService.user.findMany()
  }

  async create(body: CreateUserDto) {
    const { email, password } = body
    const user = await this.findOneByEmail(email)
    if(user){
      throw new BadRequestException('Данный Email уже используется')
    }else{
      const hashedPassword = await this.hashingPassword(password)
      const newUser = await this.prismaService.user.create({data:{email, password:hashedPassword}})
      const payload = {sub:newUser.id, email:newUser.email}
      return {id:newUser.id, access_token: this.jwtService.sign(payload)}
    }
  }

  async remove(id:string, password:string) {
    const user = await this.findOneById(id)
    const isMatchPassword = await bcrypt.compare(password, user.password)
    if(isMatchPassword){
      const deletedUser = await this.prismaService.user.delete({where:{id}})
      return {message:'Пользователь удален'}
    }else{
      throw new BadRequestException('Введен неверный пароль')
    }
  }

  
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
}
