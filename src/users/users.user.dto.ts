import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
export class LoginPatientDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly compoundId: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;
}

//   createdDate         DateTime @default(now()) @map("created_date")
// lastUpdated         DateTime @default(now()) @map("last_updated") @updatedAt
//   knownDiseaseHistory String?  @map("known_disease_history")
//   bloodGroup          String?  @map("blood_group")
//   genotype            String?  @map("genotype")
export class CreatePatientDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @ApiProperty()
  compoundId: string;

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