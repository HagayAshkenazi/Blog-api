import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { logger } from '../helpers/logs';
import { HttpMessage } from '../constants/http';
import { errorObject } from 'src/common/helpers/functions';

@Catch()
export class GeneralExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message: string =
      exception?.message ?? HttpMessage.INTERNAL_SERVER_ERROR;
    const stack = exception?.stack;

    logger.error({
      name: 'General Exception',
      path: request.url,
      method: request.method,
      exception: {
        message,
        stack,
      },
    });

    response.status(status).json(
      errorObject(status, message),
    );
  }
}
