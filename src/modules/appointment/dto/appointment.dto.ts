import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class AppointmentDto {
  @ApiProperty()
  @IsNotEmpty()
  patientId: string;

  @IsNotEmpty()
  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  selectedDate: Date;

  @ApiProperty()
  @IsBoolean()
  confirm: boolean;
}
