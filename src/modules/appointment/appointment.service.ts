import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { AppointmentNotFoundException } from './exceptions/appointment-not-found.exception';
import { ForbiddenException } from '@nestjs/common';
import { AppointmentDto } from './dto/appointment.dto';

type UpdateAppointmentData = {
  appointmentId: string;
  confirm: boolean;
  patientId: string;
};
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async createAppointment(createAppointmentDTO: AppointmentDto) {
    const appointment = await this.prisma.appointment.create({
      data: createAppointmentDTO,
    });

    return appointment;
  }

  async acceptAppointment(data: UpdateAppointmentData) {
    const { appointmentId, confirm } = data;
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) throw new AppointmentNotFoundException(appointmentId);

    return this.prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        confirm: confirm,
      },
    });
  }

  // get all appointment

  async deleteAppointment(appointmentId: string, patientId: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) throw new AppointmentNotFoundException(appointmentId);
    if (appointment.patientId !== patientId) throw new ForbiddenException();

    await this.prisma.appointment.delete({ where: { id: appointmentId } });
  }
}
