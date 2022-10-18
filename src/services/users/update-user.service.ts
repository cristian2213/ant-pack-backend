import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/dtos';
import { User } from 'src/entities/user.entity';
import { ResService } from 'src/services/utils/res.service';
import { Company } from 'src/entities/company.entity';
import { Address } from 'src/entities/addresses.entity';

@Injectable()
export class UpdateUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly resService: ResService,
  ) {}

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      const { address, company, ...userData } = updateUserDto;

      const user = await this.userRepository.findOne({
        relations: {
          address: true,
          company: true,
        },
        where: { id },
      });

      if (!user)
        return this.resService.resSuccess(
          HttpStatus.NOT_FOUND,
          `The user ${id} does not exist.`,
        );

      // update user entity
      await this.userRepository.update({ id: user.id }, userData);

      // update address realtionship
      if (address)
        await this.addressRepository.update({ id: user?.address.id }, address);

      // update company realtionship
      if (company)
        await this.companyRepository.update({ id: user?.company.id }, company);

      return this.resService.resSuccess(HttpStatus.CREATED, 'User updated');
    } catch (error) {
      return this.resService.throwException(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
