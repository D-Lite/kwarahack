import { Appointment } from '@prisma/client';
import { Expose,  } from 'class-transformer';
import { ResponseEntity } from 'src/commons/interfaces/response-entity.interface';
class AppointmentEntity implements Partial<Appointment> {
  constructor(partial: Partial<Appointment>) {
    Object.assign(this, partial);
  }

  /**
   * @example 'KW202123032'
   */
  @Expose()
  patientId: string;

  /**
   * @example '2JE32IJIJWE'
   */
  @Expose()
  workforceId: string;

  /**
   * @example '2023-01-28T13:29:13.901Z'
   */
  @Expose()
  selectedDate: Date;

  @Expose()
  confirm: boolean;
}

export class AppointmentResponseEntity
  implements ResponseEntity<AppointmentEntity>
{
  constructor(message: string, success: boolean, data?: Partial<Appointment>) {
    this.message = message;
    this.success = success;
    this.data = new AppointmentEntity(data);
  }

  @Expose()
  message: string;

  @Expose()
  data?: AppointmentEntity;

  @Expose()
  success: boolean;
}
