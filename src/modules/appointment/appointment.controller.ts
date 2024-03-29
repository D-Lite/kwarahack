import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppointmentService } from './appointment.service';

import { AppointmentDto } from './dto/appointment.dto';
import { Auth } from '../auth/auth.decorator';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { AppointmentNotFoundException } from './exceptions/appointment-not-found.exception';

import { AppointmentResponseEntity } from './entities/appointment.entity';

@ApiTags('appointment')
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  // @Auth('patient')
  @ApiException(() => [AppointmentNotFoundException])
  @HttpCode(HttpStatus.CREATED)
  @Post('/patients')
  async createAppointment(@Body() appointmentDto: AppointmentDto) {
    const appointment = await this.appointmentService.createAppointment(
      appointmentDto.patientId,
      appointmentDto.selectedDate,
    );

    return new AppointmentResponseEntity(
      'Appointment created Successfully',
      true,
      appointment,
    );
  }
}
