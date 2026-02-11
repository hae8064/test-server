import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtValidateResult } from '../strategies/jwt.strategy';

export const CurrentUser = createParamDecorator(
  (data: keyof JwtValidateResult | undefined, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<{ user: JwtValidateResult }>();
    const { user } = request;
    return data ? user?.[data] : user;
  },
);
