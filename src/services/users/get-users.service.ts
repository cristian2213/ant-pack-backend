import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { ResService } from 'src/services/utils/res.service';
import { PaginationService } from '../utils/pagination.service';

@Injectable()
export class GetUsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly resService: ResService,
    private readonly paginationService: PaginationService,
  ) {}

  async findAll(
    page: number,
    limit: number,
    sortField: string | undefined,
    sortOrder: string | undefined,
    searchingColumn: string | undefined,
    searchingValue: string | undefined,
  ): Promise<any> {
    try {
      page = page - 1;

      const { skip, limit: take } = this.paginationService.getPagination({
        page,
        limit,
      });

      // Alias for the query builder
      const alias = 'user';

      // default order by
      let orderBy = {
        [`${alias}.createdAt`]: 'DESC',
      };
      if (sortField && sortOrder) {
        const orderType =
          sortOrder == 'ascend' ? 'ASC' : sortOrder == 'descend' ? 'DESC' : '';

        switch (true) {
          case sortField === 'address':
            orderBy = {
              [`${sortField}.city`]: orderType,
            };
            break;

          case sortField === 'company':
            orderBy = {
              [`${sortField}.name`]: orderType,
            };
            break;

          default:
            orderBy = {
              [`${alias}.${sortField}`]: orderType,
            };
            break;
        }
      }

      // get total records saved in user table
      const totalQuery = this.userRepository
        .createQueryBuilder(alias)
        .select('COUNT(*)', 'total')
        .leftJoin(`${alias}.company`, 'company')
        .leftJoin(`${alias}.address`, 'address');

      // get users with their relationships
      const usersQuery = this.userRepository
        .createQueryBuilder(alias)
        // .select([
        //   alias,
        //   'company.id',
        //   'company.name',
        //   'address.id',
        //   'address.city',
        // ])
        .select()
        .leftJoinAndSelect(`${alias}.company`, 'company')
        .leftJoinAndSelect(`${alias}.address`, 'address');

      // filter by column
      if (searchingColumn && searchingValue) {
        const mappedValue = searchingValue
          .split('-')
          .join(' ')
          .toLocaleLowerCase();

        switch (true) {
          case searchingColumn === 'company.name':
          case searchingColumn === 'address.city':
            usersQuery.where(
              `LOWER(${searchingColumn}) LIKE LOWER(:searchingValue)`,
              {
                searchingValue: `%${mappedValue}%`,
              },
            );
            totalQuery.where(
              `LOWER(${searchingColumn}) LIKE LOWER(:searchingValue)`,
              {
                searchingValue: `%${mappedValue}%`,
              },
            );
            break;

          default:
            usersQuery.where(
              `LOWER(${alias}.${searchingColumn}) LIKE LOWER(:searchingValue)`,
              {
                searchingValue: `%${mappedValue}%`,
              },
            );
            totalQuery.where(
              `LOWER(${alias}.${searchingColumn}) LIKE LOWER(:searchingValue)`,
              {
                searchingValue: `%${mappedValue}%`,
              },
            );
            break;
        }
      }

      // execute queries
      const { total } = await totalQuery.getRawOne();
      const users = await usersQuery
        .orderBy(orderBy as any)
        .skip(skip)
        .take(take)
        .getMany();

      const resData = {
        users,
        total,
      };

      return this.resService.resSuccess(HttpStatus.OK, resData);
    } catch {
      return this.resService.throwException(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
