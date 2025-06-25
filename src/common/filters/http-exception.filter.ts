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

    logger.error({
      name: 'HTTP Exception',
      path: request.url,
      method: request.method,
      exception,
    });

    if (typeof errorResponse === 'object' && errorResponse !== null) {
      const { message, errors } = errorResponse as any;
      response
        .status(status)
        .json(errorObject(status, message ?? exception.message, errors));
    } else {
      response
        .status(status)
        .json(errorObject(status, errorResponse ?? exception.message));
    }
  }
}
