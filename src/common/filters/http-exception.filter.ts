import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { errorObject } from 'src/common/helpers/functions';
import { logger } from 'src/common/helpers/logs';
import { ErrorResponse } from 'src/interfaces';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus?.() ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse = exception.getResponse?.() ?? exception.message;

    logger.error({
      exception,
      path: request.url,
      name: exception.name,
      method: request.method,
    });

    let message: string | string[] = 'Unexpected error';
    let errors: any;

    if (typeof errorResponse === 'object' && errorResponse) {
      const res = errorResponse as Partial<ErrorResponse>;
      message = res.message ?? exception.message;
      errors = res.errors;
    } else if (typeof errorResponse === 'string') {
      message = errorResponse;
    }

    response.status(status).json(errorObject(status, message, errors));
  }
}
