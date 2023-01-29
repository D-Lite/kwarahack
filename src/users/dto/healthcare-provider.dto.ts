import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginHealthcareProviderDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly stateId: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;
}

export class RegisterHealthcareProviderDTO {
  @ApiProperty()
  @IsNotEmpty()
  stateId: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
