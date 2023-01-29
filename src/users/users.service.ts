import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreatePatientDto,
  LoginPatientDto,
  UpdatePatientPasswordDto,
} from './dto/patient.dto';
import { compare, hash } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import generateUID from '../commons/utils/generatePassword';
import { HealthcareProvider } from '@prisma/client';
import { LoginHealthcareProviderDto, RegisterHealthcareProviderDTO } from "./dto/healthcare-provider.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //use by patient module to update patient module
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

  //use by auth module to register user in database
  async createPatient(patientDTO: CreatePatientDto) {
    //check if the user exist in the db
    // const userInDb = await this.prisma.patient.findFirst({
    //   where: { compoundId: patientDTO.compoundId },
    // });
    //
    // if (userInDb) {
    //   throw new HttpException('user_already_exist', HttpStatus.CONFLICT);
    // }

    const newPatientId = async (dob) => {
      const check = await generateUID(dob);
      return check;
    };

    return this.prisma.patient.create({
      data: {
        ...patientDTO,
        compoundId: await newPatientId(patientDTO.dateOfBirth),
        password: await hash(patientDTO.password, 10),
      },
    });
  }

  async createHealthcare(healthcareProviderDTO: RegisterHealthcareProviderDTO) {
    //check if the user exist in the db
    // const userInDb = await this.prisma.patient.findFirst({
    //   where: { compoundId: patientDTO.compoundId },
    // });
    //
    // if (userInDb) {
    //   throw new HttpException('user_already_exist', HttpStatus.CONFLICT);
    // }

    return this.prisma.healthcareProvider.create({
      data: {
        stateId: healthcareProviderDTO.stateId,
        password: await hash(healthcareProviderDTO.password, 10),
      },
    });
  }

  // use by auth module to login user
  async findByLogin({ compoundId, password }: LoginPatientDto) {
    const user = await this.prisma.patient.findFirst({
      where: { compoundId },
    });

    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await compare(password, user.password);
    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  // use by auth module to login healthcare provider
  async findHealthcareByLogin({
    stateId,
    password,
  }: LoginHealthcareProviderDto) {
    const healthcareprovider = await this.prisma.healthcareProvider.findFirst({
      where: { stateId },
    });

    if (!healthcareprovider) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await compare(password, healthcareprovider.password);
    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    return healthcareprovider;
  }

  // use by auth module to get user in database
  async findByPayload({ compoundId }: any) {
    return await this.prisma.patient.findFirst({
      where: { compoundId },
    });
  }
}
