import { Injectable } from '@nestjs/common';
import { db } from './db';

@Injectable()
export class AppService {
  async getHello(){
    return await db.query(`select * from numbers`);
  }
}
