import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';

@Injectable()
export class MedicalRecordsService {
  constructor(private prisma: PrismaService) {}

  async create(createMedicalRecordDto: CreateMedicalRecordDto) {
    const record = await this.prisma.medicalRecord.create({
      data: createMedicalRecordDto,
    });

    return record;
  }

  async findOne(id: string) {
    const record = await this.prisma.medicalRecord.findMany({
      where: { patientId: id },
    });
    return record;
  }
}
