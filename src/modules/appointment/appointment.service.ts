import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { AppointmentNotFoundException } from './exceptions/appointment-not-found.exception';
import { ForbiddenException } from '@nestjs/common';

type UpdateAppointmentData = {
  appointmentId: string;
  confirm: boolean;
  doctorId: string;
  patientId: string;
};
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async createAppointment(
    patientId: string,
    workforceId: string,
    selectedDate: Date,
  ) {
    try {
      return this.prisma.appointment.create({
        data: {
          patientId,
          workforceId,
          selectedDate,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') return;
        else throw error;
      }
    }
  }

  async acceptAppointment(data: UpdateAppointmentData) {
    const { appointmentId, confirm, doctorId } = data;
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) throw new AppointmentNotFoundException(appointmentId);
    if (appointment.workforceId !== doctorId) throw new ForbiddenException();

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
