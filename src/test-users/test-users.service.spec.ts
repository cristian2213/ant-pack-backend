import { Test, TestingModule } from '@nestjs/testing';
import { TestUsersService } from './test-users.service';

describe('TestUsersService', () => {
  let service: TestUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestUsersService],
    }).compile();

    service = module.get<TestUsersService>(TestUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
