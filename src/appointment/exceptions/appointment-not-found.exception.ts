import { NotFoundException } from '@nestjs/common';

export class AppointmentNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Appointment with ${id} was not found`);
  }
}
