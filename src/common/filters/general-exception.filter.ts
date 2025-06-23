import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { logger } from '../helpers/logs';
import { HttpMessage } from '../constants/http';
import { errorObject } from 'src/common/helpers/functions';

@Catch()
export class GeneralExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const message: string =
      exception?.message ?? HttpMessage.INTERNAL_SERVER_ERROR;
    const stack: string | undefined = exception?.stack;

    logger.error({
      name: 'General Exception',
      path: request.url,
      method: request.method,
      exception: {
        message,
        stack,
      },
    });

    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(errorObject(HttpStatus.INTERNAL_SERVER_ERROR, message));
  }
}
