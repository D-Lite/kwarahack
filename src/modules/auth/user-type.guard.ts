import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/**
 * This guard is used to ensure that the user account type is of the expected type.
 * Use this guard after an AuthGuard to ensure that the user is
 * authenticated.
 */

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const user: UserInfo = context.switchToHttp().getRequest().user;

    if (!user) return false;

    const expectedType = this.reflector.get<AccountType>(
      'user-type',
      context.getHandler(),
    );

    if (!expectedType) return true;

    return user.accountType === expectedType;
  }
}
