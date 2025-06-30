import { logger } from '../helpers/logs';
import { errorObject } from '../helpers/functions';

import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { I18nContext } from 'nestjs-i18n';

@Catch()
export class GeneralExceptionFilter implements ExceptionFilter {
  async catch(exception: Error, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const i18n = I18nContext.current();

    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception?.message && exception.message !== 'Internal server error'
        ? exception.message
        : await i18n?.translate('common.errors.INTERNAL_SERVER_ERROR');

    logger.error({
      path: request.url,
      method: request.method,
      name: 'General Exception',
      exception: {
        message,
        stack: exception.stack,
      },
    });

    response.status(status).json(errorObject(status, message));
  }
}
