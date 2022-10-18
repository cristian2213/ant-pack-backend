import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  Length,
  IsEmail,
  IsUrl,
  IsOptional,
  ValidateNested,
  IsString,
  IsNumberString,
  IsNotEmpty,
} from 'class-validator';

class CompanyDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsString()
  @Length(2, 244)
  name: string;

  @ApiProperty({
    type: String,
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @Length(2, 255)
  catchPhrase?: string;

  @ApiProperty({
    type: String,
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @Length(2, 255)
  bs?: string;
}

class GetDto {
  @ApiProperty({
    required: true,
    nullable: false,
    type: String,
  })
  @IsString()
  lat: string;

  @ApiProperty({
    required: true,
    nullable: false,
    type: String,
  })
  @IsString()
  lng: string;
}

class AddressDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsString()
  @Length(4, 100)
  street: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsString()
  @Length(1, 100)
  suite: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsString()
  @Length(2, 100)
  city: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsString()
  zipcode: string;

  @ApiProperty({
    required: true,
    nullable: false,
    type: GetDto,
  })
  @ValidateNested()
  @Type(() => GetDto)
  geo: string;
}

export class CreateUserDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsString()
  username: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNumberString()
  phone: string;

  @ApiProperty({
    type: String,
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({
    type: String,
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({
    required: true,
    nullable: false,
    type: CompanyDto,
  })
  @ValidateNested()
  @Type(() => CompanyDto)
  company: CompanyDto;

  @ApiProperty({
    required: true,
    nullable: false,
    type: AddressDto,
  })
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class ValidateUniqueFieldDto {
  @ApiProperty({
    required: true,
    nullable: false,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  field: string;

  @ApiProperty({
    required: true,
    nullable: false,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  value: string;
}
