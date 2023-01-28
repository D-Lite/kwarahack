import { Patient } from '@prisma/client';
import { Expose } from 'class-transformer';

export class PatientEntity implements Partial<Patient> {
  constructor(partial: Partial<Patient>) {
    Object.assign(this, partial);
  }

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

  /**
   * @example 'Anti-pepper'
   */
  @Expose()
  allergies: string[];

  /**
   * @example 'O+'
   */
  @Expose()
  bloodGroup: string;

  /**
   * @example 'Malaria'
   */
  @Expose()
  knownDiseaseHistory: string[];

  /**
   * @example 'AA'
   */
  @Expose()
  genotype: string;
}
