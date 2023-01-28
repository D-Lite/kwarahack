import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePatientDto, LoginPatientDto, UpdatePatientPasswordDto
} from './users.user.dto';
import { compare, hash } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import {Patient} from "@prisma/client";
import generateUID from "../commons/utils/generatePassword";

interface FormatPatientLogin extends Partial<Patient> {
  compoundId: string
}
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {
  }

  //use by patient module to update patient module
  async updatePatientPassword(
    payload: UpdatePatientPasswordDto,
    id: string,
  ): Promise<Patient> {
    const patient = await this.prisma.patient.findUnique({
      where: {id}
    });

    if (!patient) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    // compare password
    const areEqual = await compare(payload.old_password, patient.password);
    if(!areEqual) {
      throw new HttpException('Invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    return this.prisma.patient.update({
      where: { id },
      data: { password: await hash(payload.new_password, 10) }
    });
  }

  //use by auth module to register user in database
  async createPatient(patientDTO: CreatePatientDto) : Promise<any> {
    //check if the user exist in the db
    const userInDb = await this.prisma.patient.findFirst({
      where: {compoundId: patientDTO.compoundId}
    });

    if (userInDb) {
      throw new HttpException("user_already_exist", HttpStatus.CONFLICT);
    }

    const newPatientId = async () => {
      let check  = await generateUID(patientDTO.dateOfBirth)
      const userInDb = await this.prisma.patient.findFirst({
        where: {compoundId: check}
      });

      if(userInDb) {
        newPatientId()
      }
      else {
        return check
      }
    }
    return this.prisma.patient.create({
      ...(patientDTO),
      compoundId: await newPatientId()
      password: await hash(patientDTO, 10)
    })
  }

  // use by auth module to login user
  async findByLogin({compoundId, password}: LoginPatientDto): Promise<FormatPatientLogin> {
    const user = await this.prisma.patient.findFirst({
      where: {compoundId}
    });

    if (!user) {
      throw new HttpException("invalid_credentials", HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await compare(password, user.password);
    if (!areEqual) {
      throw new HttpException("invalid_credentials", HttpStatus.UNAUTHORIZED);
    }

    const {password: p, ...rest} = user;
    return rest;
  }

  // use by auth module to get user in database
  async findByPayload({compoundId}: any): Promise<any> {
    return await this.prisma.patient.findFirst({
      where: {compoundId}
    })
  }
}


