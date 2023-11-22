import { Controller, Body, Post,UseGuards ,Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from 'src/users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req:{user:UserDto}) {
    return req.user;
  }

  validateUser(@Body() data:LoginAuthDto){
    return this.authService.validateUser(data.email, data.password)
  }
}
