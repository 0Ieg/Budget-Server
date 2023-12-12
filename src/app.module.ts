import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { GlobalJwtModule } from './global/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    GlobalJwtModule,
    UsersModule,
    TransactionsModule,
    CategoriesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}
