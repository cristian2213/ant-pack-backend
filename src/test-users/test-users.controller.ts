import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestUsersService } from './test-users.service';
import { CreateTestUserDto } from './dto/create-test-user.dto';
import { UpdateTestUserDto } from './dto/update-test-user.dto';

@Controller('test-users')
export class TestUsersController {
  constructor(private readonly testUsersService: TestUsersService) {}

  @Post()
  create(@Body() createTestUserDto: CreateTestUserDto) {
    return this.testUsersService.create(createTestUserDto);
  }

  @Get()
  findAll() {
    return this.testUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestUserDto: UpdateTestUserDto) {
    return this.testUsersService.update(+id, updateTestUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testUsersService.remove(+id);
  }
}
