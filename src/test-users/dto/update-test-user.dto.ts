import { PartialType } from '@nestjs/swagger';
import { CreateTestUserDto } from './create-test-user.dto';

export class UpdateTestUserDto extends PartialType(CreateTestUserDto) {}
