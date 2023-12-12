import { Module, Global } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Global()
@Module({
  imports:[JwtModule.registerAsync({
    imports:[ConfigModule],
    inject: [ConfigService],
    useFactory:(configService:ConfigService)=>({
      secret:configService.get('JWT_SECRET'),
      signOptions:{expiresIn:configService.get('JWT_EXPIRESIN')}
    })
  })],
  exports:[JwtService]
})
export class GlobalJwtModule {}