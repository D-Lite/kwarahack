import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMedicalRecordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  patientId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  workforceId: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  bodytemperature?: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  pulse?: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  respiratoryrate?: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  bloodsugar?: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  bodyfatpercent?: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  cholestrol?: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  hemoglobin?: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  whitebloodcell?: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  bmi?: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  oxygenlevel?: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  bloodpressure?: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  weight?: string;
}
