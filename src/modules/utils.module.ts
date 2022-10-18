import { JwtService } from '@nestjs/jwt';
import { Global, Module } from '@nestjs/common';
import { PaginationService } from 'src/services/utils/pagination.service';
import { TokenService } from 'src/services/utils/token.service';
import { HashService } from 'src/services/utils/hash.service';
import { ResService } from 'src/services/utils/res.service';

@Global()
@Module({
  providers: [
    PaginationService,
    TokenService,
    JwtService,
    HashService,
    ResService,
  ],
  exports: [PaginationService, TokenService, HashService, ResService],
})
export class UtilsModule {}
