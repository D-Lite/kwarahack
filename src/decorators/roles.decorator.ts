import { SetMetadata } from '@nestjs/common';
import { WorkforceRole } from '@prisma/client';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: WorkforceRole[]) =>
  SetMetadata(ROLES_KEY, roles);
