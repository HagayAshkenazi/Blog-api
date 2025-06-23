import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { errorObject } from 'src/common/helpers/functions';
import { logger } from 'src/common/helpers/logs';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    const message =
      typeof errorResponse === 'string'
        ? errorResponse
        : (errorResponse as { message?: string }).message || exception.message;

    logger.error({
      name: 'HTTP Exception',
      path: request.url,
      method: request.method,
      exception,
    });

    response.status(status).json(errorObject(status, message));
  }
}
