import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { I18nService, logger } from 'nestjs-i18n';
import { errorObject } from '@/common/helpers/functions';
import { PRISMA_ERROR_CODES } from '@/constants/prisma-error-codes.constant';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaNotFoundFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  async catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ): Promise<void> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { code, name } = exception;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    switch (code) {
      case PRISMA_ERROR_CODES.RECORD_NOT_FOUND:
        status = HttpStatus.NOT_FOUND;
        message = await this.i18n.translate('common.posts.errors.NOT_FOUND', {
          args: { id: request.params?.id || 'unknown' },
        });
        break;

      default:
        message = await this.i18n.translate(
          'common.errors.INTERNAL_SERVER_ERROR',
        );
        break;
    }

    logger.error({
      exception,
      path: request.url,
      name: name,
      method: request.method,
      status,
    });

    response.status(status).json(errorObject(status, message));
  }
}
