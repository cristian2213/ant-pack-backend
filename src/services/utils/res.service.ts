import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EResSuccess } from 'src/interfaces';

@Injectable()
export class ResService {
  resSuccess(code: number, data: any): EResSuccess {
    return {
      statusCode: code,
      data,
    };
  }

  throwException(code: number, message?: string) {
    switch (code) {
      case HttpStatus.BAD_REQUEST:
        throw new BadRequestException(message);

      case HttpStatus.NOT_FOUND:
        throw new NotFoundException(message);

      case HttpStatus.INTERNAL_SERVER_ERROR:
      default:
        throw new InternalServerErrorException();
    }
  }
}
