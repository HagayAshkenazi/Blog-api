import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException(
        await this.i18n.translate('common.auth.errors.MISSING_AUTH_HEADER'),
      );
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || token !== this.configService.get('AUTH_TOKEN')) {
      throw new UnauthorizedException(
        await this.i18n.translate('common.auth.errors.INVALID_TOKEN'),
      );
    }

    return true;
  }
}