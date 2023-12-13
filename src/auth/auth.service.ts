import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private readonly usersService:UsersService, private readonly jwtService:JwtService){}

  async validateUser(email: string, password: string){
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const isMatchPassword  = await bcrypt.compare(password, user.password)
      if(isMatchPassword){
        const {password, ...result} = user
        return result
      }else{
        throw new UnauthorizedException('Email or password entered incorrectly')
      }
    }else{
      throw new UnauthorizedException('The user with this email was not found')
    }
  }

  async login(id:string, email:string) {
    const payload = {sub:id, email};
    return {id, access_token: this.jwtService.sign(payload)}
  }
}
