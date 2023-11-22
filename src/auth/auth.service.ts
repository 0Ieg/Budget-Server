import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService:UsersService){}

  async validateUser(email: string, password: string){
    const user = await this.usersService.findOneForAuthorization(email);
    const isMatch  = await bcrypt.compare(password, user.user_password)
    if (user && isMatch) {
      return user
    }else{
      return null
    }
  }
}
