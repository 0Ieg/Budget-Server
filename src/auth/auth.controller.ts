import { Controller, Post, UseGuards ,Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req:any) {
    return this.authService.login(req.user.id, req.user.email)
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@Req() req:any) {
    return this.authService.profile(req.user.id)
  }
}
