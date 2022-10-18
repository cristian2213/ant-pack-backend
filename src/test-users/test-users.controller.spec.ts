import { Test, TestingModule } from '@nestjs/testing';
import { TestUsersController } from './test-users.controller';
import { TestUsersService } from './test-users.service';

describe('TestUsersController', () => {
  let controller: TestUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestUsersController],
      providers: [TestUsersService],
    }).compile();

    controller = module.get<TestUsersController>(TestUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
