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
import {
  LoginHealthcareProviderDto,
  RegisterHealthcareProviderDTO,
} from '../users/dto/healthcare-provider.dto';

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
    const patient = await this.authService.login(loginPatientDto);
    return new PatientResponseEntity('Login successful', true, patient);
  }

  @Post('loginhealthcareprovider')
  public async loginHealthcareProvider(
    @Body() loginHealthcareProviderDto: LoginHealthcareProviderDto,
  ): Promise<any> {
    return await this.authService.loginHealthcareProvider(
      loginHealthcareProviderDto,
    );
  }

  @Post('registerhealthcareprovider')
  public async registerHealthcareProvider(
    @Body() registerHealthcareProviderDTO: RegisterHealthcareProviderDTO,
  ) {
    const healthcareprovider =
      await this.authService.registerhealthcareprovider(
        registerHealthcareProviderDTO,
      );
    return new PatientResponseEntity(
      'ACCOUNT_CREATE_SUCCESS',
      true,
      healthcareprovider,
    );
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
