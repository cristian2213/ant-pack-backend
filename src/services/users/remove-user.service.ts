import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ResService } from '../utils/res.service';

@Injectable()
export class RemoveUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly resService: ResService,
  ) {}

  async remove(id: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        relations: {
          address: true,
          company: true,
        },
        where: { id },
      });
      if (!user)
        return this.resService.throwException(
          HttpStatus.NOT_FOUND,
          `The user ${id} does not exist.`,
        );

      await this.userRepository.remove(user);
      return this.resService.resSuccess(HttpStatus.OK, user);
    } catch {
      return this.resService.throwException(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
