import { Patient } from '@prisma/client';
import { Expose } from 'class-transformer';
import { ResponseEntity } from 'src/commons/interfaces/response-entity.interface';
class PatientEntity implements Partial<Patient> {
  constructor(partial: Partial<Patient>) {
    Object.assign(this, partial);
  }

  /**
   * @example 'KW58062820'
   */
  @Expose()
  compoundId: string;

  /**
   * @example 'Busari'
   */
  @Expose()
  firstName: string;

  /**
   * @example 'Joshua'
   */
  @Expose()
  lastName: string;

  /**
   * @example '09000000100'
   */
  @Expose()
  phoneNumber: string;

  /**
   * @example '2023-01-28T13:29:13.901Z'
   */
  @Expose()
  dateOfBirth: Date;

  @Expose()
  allergies: string[];

  /**
   * @example 'O+'
   */
  @Expose()
  bloodGroup: string;

  @Expose()
  knownDiseaseHistory: string[];

  /**
   * @example 'AA'
   */
  @Expose()
  genotype: string;

  /**
   * @example 'KW58062820'
   */
  @Expose()
  token: string;
}

export class PatientResponseEntity implements ResponseEntity<PatientEntity> {
  constructor(
    message: string,
    success: boolean,
    data?: Partial<Patient>,
    token?: string,
  ) {
    this.message = message;
    this.success = success;
    this.data = new PatientEntity(data);
    this.token = token;
  }

  @Expose()
  message: string;

  @Expose()
  data?: PatientEntity;

  @Expose()
  success: boolean;

  @Expose()
  token: string;
}
