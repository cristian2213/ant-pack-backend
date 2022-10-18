import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  public async hashPassword(password: string, salt = 10) {
    return await bcrypt.hash(password, salt);
  }
}
