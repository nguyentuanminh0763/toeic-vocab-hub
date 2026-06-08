import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    // Không có token → bỏ qua auth, request.user = undefined
    if (!req.headers?.authorization) return true;
    // Có token → validate bình thường
    return super.canActivate(context);
  }

  handleRequest(_err: any, user: any) {
    return user ?? null;
  }
}
