import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UsersController } from 'src/controllers/users.controller';
import { CreateUserService } from 'src/services/users/create-user.service';
import { GetUserService } from 'src/services/users/get-user.service';
import { GetUsersService } from 'src/services/users/get-users.service';
import { UpdateUserService } from 'src/services/users/update-user.service';
import { RemoveUserService } from 'src/services/users/remove-user.service';
import { ValidateUserService } from 'src/services/users/validate-user.service';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],

  controllers: [UsersController],
  providers: [
    CreateUserService,
    GetUserService,
    GetUsersService,
    UpdateUserService,
    RemoveUserService,
    ValidateUserService,
  ],
})
export class UsersModule {}
