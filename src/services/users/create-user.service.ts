import { Repository } from 'typeorm';

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos';
import { ResService } from 'src/services/utils/res.service';
import { User } from 'src/entities/user.entity';
import { Address } from 'src/entities/addresses.entity';
import { Company } from 'src/entities/company.entity';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private readonly resService: ResService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      const { company, address, ...userData } = createUserDto;
      address.geo = JSON.stringify(address.geo);

      // check if the email & phone already exists
      const user = await this.userRepository.findOne({
        where: [{ email: userData.email }, { phone: userData.phone }],
      });
      if (user) {
        if (user.email === userData.email)
          return this.resService.resSuccess(
            HttpStatus.BAD_REQUEST,
            `The email ${userData.email} already exists.`,
          );

        if (user.username === userData.username)
          return this.resService.resSuccess(
            HttpStatus.BAD_REQUEST,
            `The username ${userData.username} already exists.`,
          );

        return this.resService.resSuccess(
          HttpStatus.BAD_REQUEST,
          `The phone ${userData.phone} already exists.`,
        );
      }

      // create user
      const userInstace = this.userRepository.create(userData);
      const savedUser = await this.userRepository.save(userInstace);

      const addressI = this.addressRepository.create(address) as any;
      const companyI = this.companyRepository.create(company) as any;

      // attach user to the relationship
      addressI.user = savedUser;
      companyI.user = savedUser;

      await Promise.all([
        this.addressRepository.save(addressI),
        this.companyRepository.save(companyI),
      ]);

      return this.resService.resSuccess(HttpStatus.CREATED, savedUser);
    } catch (error) {
      // console.log(error);
      return this.resService.throwException(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
