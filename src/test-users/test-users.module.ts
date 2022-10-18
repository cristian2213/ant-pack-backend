import { Module } from '@nestjs/common';
import { TestUsersService } from './test-users.service';
import { TestUsersController } from './test-users.controller';

@Module({
  controllers: [TestUsersController],
  providers: [TestUsersService]
})
export class TestUsersModule {}
