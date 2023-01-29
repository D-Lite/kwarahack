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
