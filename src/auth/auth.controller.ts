import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import {
  CreatePatientDto,
  LoginPatientDto,
  UpdatePatientPasswordDto,
} from '../users/dto/patient.dto';

import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PatientResponseEntity } from 'src/users/entities/patient.entity';
import { JwtAuthGuard } from './jwt.guard';

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

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Put('patient/password')
  public async updatePassword(
    @Request() req,
    @Body()
    updatePatientPasswordDto: UpdatePatientPasswordDto,
  ) {
    await this.authService.updatePatientPassword(
      updatePatientPasswordDto,
      req.user.id,
    );
    return {
      message: 'password_update_success',
    };
  }
}
