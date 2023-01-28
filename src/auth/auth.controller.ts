import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  AuthService,
  RegistrationSeederStatus,
  RegistrationStatus,
} from './auth.service';
// import {
//   RenderSeederUser,
//   SeedUserDto,
//   UserRole,
// } from '../users/user.dto';
import {
  CreatePatientDto,
  LoginPatientDto,
} from "../users/users.user.dto";

import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registerpatient')
  public async registerPatient(
    @Body() createPatientDto: CreatePatientDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createPatientDto,
    );
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Post('loginpatient')
  public async loginPatient(@Body() loginPatientDto: LoginPatientDto): Promise<any> {
    return await this.authService.login(loginPatientDto);
  }
}
