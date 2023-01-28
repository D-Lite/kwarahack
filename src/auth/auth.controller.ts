import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreatePatientDto, LoginPatientDto } from '../users/dto/patient.dto';

import { ApiTags } from '@nestjs/swagger';
import { PatientResponseEntity } from 'src/users/entities/patient.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registerpatient')
  public async registerPatient(@Body() createPatientDto: CreatePatientDto) {
    const patient = await this.authService.register(createPatientDto);
    return new PatientResponseEntity('ACCOUNT_CREATE_SUCCESS', true, patient);
  }

  @Post('loginpatient')
  public async loginPatient(
    @Body() loginPatientDto: LoginPatientDto,
  ): Promise<any> {
    return await this.authService.login(loginPatientDto);
  }
}