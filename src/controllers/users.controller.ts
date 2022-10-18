// *********** Third Party Packages *************
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// ************* Services ***********************
import { CreateUserService } from 'src/services/users/create-user.service';
import { GetUsersService } from 'src/services/users/get-users.service';
import { GetUserService } from 'src/services/users/get-user.service';
import { UpdateUserService } from 'src/services/users/update-user.service';
import { RemoveUserService } from 'src/services/users/remove-user.service';
// ************* Dtos ****************************
import { CreateUserDto, UpdateUserDto, ValidateUniqueFieldDto } from 'src/dtos';
import { ValidateUserService } from 'src/services/users/validate-user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUpload } from 'src/services/utils/file-upload.service';
import { SharpPipe } from 'src/pipes/sharp.pipe';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService,
    private readonly getUsersService: GetUsersService,
    private readonly updateUserService: UpdateUserService,
    private readonly removeUserService: RemoveUserService,
    private readonly validateUserService: ValidateUserService,
  ) {}

  @ApiOperation({ summary: 'Create user' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sortField') sortField?: string | undefined,
    @Query('sortOrder') sortOrder?: string | undefined,
    @Query('searchingCol') searchingColumn?: string | undefined,
    @Query('searchingVal') searchingValue?: string | undefined,
  ) {
    return this.getUsersService.findAll(
      page,
      limit,
      sortField,
      sortOrder,
      searchingColumn,
      searchingValue,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getUserService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.updateUserService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeUserService.remove(id);
  }

  @Post('validate/unique')
  validateUniqueFiled(@Body() validateUniqueFieldDto: ValidateUniqueFieldDto) {
    return this.validateUserService.validate(validateUniqueFieldDto);
  }

  @Post('upload-avatar')
  @UseInterceptors(
    FileInterceptor('user-avatar', {
      limits: { files: 1, fileSize: 1048576 }, // 1m
      fileFilter: FileUpload.fileFilter,
    }),
  )
  uploadFile(
    @UploadedFile(SharpPipe) image: { filename: string; location: string },
  ) {
    return image;
  }
}
