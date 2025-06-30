import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const i18n = I18nContext.current(); 
    const authHeader = request.get('authorization');

    if (!authHeader) {
      throw new UnauthorizedException(
        await i18n.translate('common.auth.errors.MISSING_AUTH_HEADER'),
      );
    }

    const [type, token] = authHeader.split(' ');

    if (
      type !== 'Bearer' ||
      !token ||
      token !== this.configService.get<string>('AUTH_TOKEN')
    ) {
      throw new UnauthorizedException(
        await i18n.translate('common.auth.errors.INVALID_TOKEN'),
      );
    }

    return true;
  }
}
