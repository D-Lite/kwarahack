import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  applyDecorators,
  SetMetadata,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt.guard';
import { UserTypeGuard } from './user-type.guard';

export const Auth = (userType?: AccountType) => {
  return applyDecorators(
    SetMetadata('user-type', userType),
    UseGuards(JwtAuthGuard, UserTypeGuard),
    ApiBearerAuth(),
    ApiException(() => UnauthorizedException, {
      description:
        'Unauthorized. Include a valid access token in the authorization header',
    }),
  );
};
