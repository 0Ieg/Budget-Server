import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private readonly usersService:UsersService, private readonly jwtService:JwtService){}

  async validateUser(email: string, password: string){
    const user = await this.usersService.findOneForAuthorization(email);
    const isMatch  = await bcrypt.compare(password, user.user_password)
    if (user && isMatch) {
      return user
    }else{
      return null
    }
  }

  async login(email:string, id:number) {
    const payload = { email, id };
    return {
      email, id, access_token: this.jwtService.sign(payload)
    }
  }
}
