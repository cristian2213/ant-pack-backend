import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { ResService } from 'src/services/utils/res.service';

@Injectable()
export class GetUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly resService: ResService,
  ) {}

  async findOne(id: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user)
        return this.resService.throwException(
          HttpStatus.NOT_FOUND,
          `The user ${id} does not exist.`,
        );
      return this.resService.resSuccess(HttpStatus.OK, user);
    } catch {
      this.resService.throwException(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
