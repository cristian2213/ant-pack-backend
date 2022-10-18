import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  public DEFAULT_PAGE_NUMBER = 0;
  public DEFAULT_PAGE_LIMIT = 10;

  public getPagination(query: { page: number; limit: number }) {
    const page = Math.abs(query.page) || this.DEFAULT_PAGE_NUMBER;
    const limit = Math.abs(query.limit) || this.DEFAULT_PAGE_LIMIT;
    const skip = page * limit;

    return {
      skip,
      limit,
    };
  }
}
