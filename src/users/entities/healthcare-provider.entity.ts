import { HealthcareProvider } from '@prisma/client';
import { Expose } from 'class-transformer';

class HealthcareProviderEntity implements Partial<HealthcareProvider> {
  constructor(partial: Partial<HealthcareProvider>) {
    Object.assign(this, partial);
  }

  /**
   * @example 'KWHP1202'
   */
  @Expose()
  stateId: string;
}
