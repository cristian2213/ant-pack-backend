import { Injectable } from '@nestjs/common';
import { CreateTestUserDto } from './dto/create-test-user.dto';
import { UpdateTestUserDto } from './dto/update-test-user.dto';

@Injectable()
export class TestUsersService {
  create(createTestUserDto: CreateTestUserDto) {
    return 'This action adds a new testUser';
  }

  findAll() {
    return `This action returns all testUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testUser`;
  }

  update(id: number, updateTestUserDto: UpdateTestUserDto) {
    return `This action updates a #${id} testUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} testUser`;
  }
}
