import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
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

  @Auth('patient')
  @ApiException(() => [AppointmentNotFoundException])
  @HttpCode(HttpStatus.CREATED)
  @Post('/patients/:patientId/appointments')
  async createAppointment(
    @Param() patientId: string,
    @Body() appointmentDto: AppointmentDto,
  ) {
    const appointment = await this.appointmentService.createAppointment(
      appointmentDto.patientId,
      appointmentDto.workforceId,
      appointmentDto.selectedDate,
    );

    return new AppointmentResponseEntity(
      'Appointment created Successfully',
      true,
      appointment,
    );
  }

  @Auth('workforce')
  @ApiException(() => [AppointmentNotFoundException])
  @HttpCode(HttpStatus.OK)
  @Patch('/workforce/:doctorId/appointments')
  async acceptAppointment(
    @Param() workforceId: string,
    @Body() appointmentDto: AppointmentDto,
  ) {
    const appointment = await this.appointmentService.acceptAppointment({
      appointmentId: appointmentDto.id,
      confirm: appointmentDto.confirm,
      doctorId: appointmentDto.workforceId,
    });
    return new AppointmentResponseEntity(
      'Appointment accepted successfully',
      true,
      appointment,
    );
  }
}
