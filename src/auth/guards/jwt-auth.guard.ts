import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<T>(err: Error | null, user: T, info: Error | null): T {
    if (err || !user) {
      const message =
        info?.message ??
        err?.message ??
        '토큰이 유효하지 않거나 만료되었습니다.';
      throw new UnauthorizedException(message);
    }
    return user;
  }
}
