import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreatePatientDto, LoginPatientDto } from '../users/dto/patient.dto';
import { JwtPayload } from './jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { Patient } from '@prisma/client';
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

  async login(loginPatientDto: LoginPatientDto): Promise<any> {
    // find user in db
    const user = await this.usersService.findByLogin(loginPatientDto);

    // generate and sign token
    const token = this._createToken(user);

    return {
      ...token,
      data: user,
    };
  }

  private _createToken({ compoundId }): any {
    const user: JwtPayload = { compoundId };
    const Authorization = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRESIN,
      Authorization,
    };
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
