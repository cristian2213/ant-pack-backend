import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ValidateUniqueFieldDto } from 'src/dtos';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ValidateUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async validate(validateUniqueFieldDto: ValidateUniqueFieldDto) {
    const { field, value } = validateUniqueFieldDto;

    const valueExists = await this.userRepository
      .createQueryBuilder()
      .where(`LOWER(${field}) = LOWER(:value)`, { value })
      .getOne();

    if (valueExists)
      return {
        available: false,
        id: valueExists.id,
      };

    return {
      available: true,
    };
  }
}
