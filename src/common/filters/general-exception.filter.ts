import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { I18nContext } from 'nestjs-i18n';
import { logger } from '@/common/helpers/logs';
import { errorObject } from '@/common/helpers/functions';
import { AppException } from '@/interfaces';

@Catch()
export class GeneralExceptionFilter implements ExceptionFilter {
  async catch(exception: AppException, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const i18n = I18nContext.create(request); 

    const status =
      exception.status ??
      exception.getErrorStatus?.() ??
      HttpStatus.INTERNAL_SERVER_ERROR;

    const errorNumber = exception.getErrorNumber?.() ?? status;

    const isInternal = errorNumber === HttpStatus.INTERNAL_SERVER_ERROR;

    const message = isInternal
      ? await i18n.translate('common.errors.INTERNAL_SERVER_ERROR')
      : exception.message;

    logger.error({
      path: request.url,
      method: request.method,
      name: exception.name,
      exception: {
        message,
        stack: exception.stack,
        errorNumber,
        status
      },
    });

    response.status(status).json(errorObject(status, message));
  }
}