import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory:(configService:ConfigService)=>({
        secret: configService.get('JWT_SECRET'),
        signOptions:{expiresIn: configService.get('JWT_EXPIRATION_TIME')}
      }),
      inject:[ConfigService]
    })
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
