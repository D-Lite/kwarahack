import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import {
  CreatePatientDto,
  LoginPatientDto,
  UpdatePatientPasswordDto,
} from '../users/dto/patient.dto';
import { JwtPayload } from './jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { HealthcareProvider, Patient } from '@prisma/client';
import {
  LoginHealthcareProviderDto,
  RegisterHealthcareProviderDTO,
} from '../users/dto/healthcare-provider.dto';
// import {User} from "../users/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(patientDto: CreatePatientDto) {
    /* let status: GenericStatus<Patient> = {
      success: true,
      message: 'ACCOUNT_CREATE_SUCCESS',
      data: ,
    }; */
    let patient: Patient;

    try {
      patient = await this.usersService.createPatient(patientDto);
    } catch (err) {
      // You can catch and then throw more specific errors here
      throw err;
    }

    return patient;
  }

  async registerhealthcareprovider(
    healthcareProviderDTO: RegisterHealthcareProviderDTO,
  ) {
    /* let status: GenericStatus<Patient> = {
      success: true,
      message: 'ACCOUNT_CREATE_SUCCESS',
      data: ,
    }; */
    let healthcare: HealthcareProvider;

    try {
      healthcare = await this.usersService.createHealthcare(
        healthcareProviderDTO,
      );
    } catch (err) {
      // You can catch and then throw more specific errors here
      throw err;
    }

    return healthcare;
  }

  async login(loginPatientDto: LoginPatientDto): Promise<any> {
    // find user in db
    const user = await this.usersService.findByLogin(loginPatientDto);

    // generate and sign token
    const token = this._createToken(user);

    const final = {
      token,
      user,
    };

    return final;
  }

  async loginHealthcareProvider(
    loginHealthcareProviderDto: LoginHealthcareProviderDto,
  ): Promise<any> {
    const healthprovider = await this.usersService.findHealthcareByLogin(
      loginHealthcareProviderDto,
    );

    // generate and sign token
    const token = this._createHealthcareToken(healthprovider);

    const final = {
      healthprovider,
      token,
    };
    return final;
  }

  async updatePatientPassword(payload: UpdatePatientPasswordDto, id: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!patient) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    // compare password
    const areEqual = await compare(payload.old_password, patient.password);
    if (!areEqual) {
      throw new HttpException('Invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    return this.prisma.patient.update({
      where: { id },
      data: { password: await hash(payload.new_password, 10) },
    });
  }
  private _createToken({ compoundId }): any {
    const user: JwtPayload = { compoundId };
    const Authorization = this.jwtService.sign(user);
    return Authorization;
    // return {
    //   expiresIn: process.env.EXPIRESIN,
    //   Authorization,
    // };
  }

  private _createHealthcareToken({ stateId }): any {
    const user: JwtPayload = { stateId };
    const Authorization = this.jwtService.sign(user);
    return Authorization;
    // return {
    //   expiresIn: process.env.EXPIRESIN,
    //   Authorization,
    // };
  }

  async validatePatient(payload: JwtPayload): Promise<any> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}

export interface GenericStatus<T> {
  success: boolean;
  message: string;
  data?: T;
}
export interface RegistrationSeederStatus {
  success: boolean;
  message: string;
  data?: Patient[];
}
