import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
// import { IRandomToken } from 'src/interfaces/token.interface';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  public generateJWT(payload: any, expirationTime = null): any {
    const ttl = expirationTime || (1000 * 60 * 60 * 24 * 7).toString();
    const token = this.jwtService.sign(payload, {
      expiresIn: ttl,
    });
    return { token, ttl };
  }
  /**
   *
   * @param {number} bytes - by default 22 bytes
   * @param {string} ttl - by default 24h
   * @returns [Object] - {token, ttl}
   */
  public generateRandomToken(bytes = 22, ttl = null): any {
    const token = randomBytes(bytes).toString('hex');
    const time = ttl || new Date().getTime() + 1000 * 60 * 60 * 24; //24h
    const expirationTime = new Date(time);
    return { token, ttl: expirationTime };
  }

  public generateRandomCode(len = 2, ttl = null) {
    const lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
    const upperAlphabet = lowerAlphabet.toUpperCase();
    const random = Math.floor(100000 + Math.random() * 900000).toString();
    const time = ttl || new Date().getTime() + 1000 * 60 * 60 * 24; //24h
    const expirationTime = new Date(time);

    let code = '';
    for (let i = 0; i < len; i++) {
      const randonIndex = Math.floor(Math.random() * lowerAlphabet.length);
      const randonIndex2 = Math.floor(Math.random() * upperAlphabet.length);
      const randonIndex3 = Math.floor(Math.random() * 6);
      code += `${upperAlphabet[randonIndex]}${random[randonIndex3]}${lowerAlphabet[randonIndex2]}`;
    }
    const shuffle = this.shuffle(Array.from(code)).join('');
    return { code: shuffle, ttl: expirationTime };
  }

  public shuffle(array: string[] | number[]) {
    let currentIndex = array.length;
    let randomIndex: number;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }
}
