import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('medical-records')
@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  @Post()
  async create(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
    return await this.medicalRecordsService.create(createMedicalRecordDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.medicalRecordsService.findOne(id);
  }
}
