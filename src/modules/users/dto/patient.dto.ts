import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class LoginPatientDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly compoundId: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;
}

export class CreatePatientDto {
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;
  @IsNotEmpty()
  @ApiProperty()
  phoneNumber: string;
  @IsNotEmpty()
  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  dateOfBirth: Date;

  // Gets only validated if it's part of the request's body
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  allergies: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  bloodGroup: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  knownDiseaseHistory: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  genotype: string;
}
export class UpdatePatientPasswordDto {
  @IsNotEmpty()
  @ApiProperty()
  new_password: string;

  @IsNotEmpty()
  @ApiProperty()
  old_password: string;
}
