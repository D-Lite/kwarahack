import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { WorkforceRole } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<WorkforceRole[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    // const user: User = request.user;
    // return this.matchRoles(roles, user.role);
  }

  matchRoles(roles: WorkforceRole[], role: WorkforceRole) {
    if (roles.find((x) => x == role)) {
      return true;
    }

    return false;
  }
}
