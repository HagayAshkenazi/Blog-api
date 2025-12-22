import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { logger } from '@/common/helpers/logs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();

    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap(() => {
        const elapsed = Date.now() - startTime;
        logger.http(
          `Request to ${request.method} ${request.url} took ${elapsed}ms`,
        );
      }),
    );
  }
}