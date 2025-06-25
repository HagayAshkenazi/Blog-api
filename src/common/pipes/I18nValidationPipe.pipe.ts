import {
  Injectable,
  ValidationPipe,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { ValidationError } from 'class-validator';
import { validationExceptionFactory } from '../exceptions/validation-exception.factory';

@Injectable()
export class I18nValidationPipe extends ValidationPipe {
  async transform(value: string, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (error) {
      const i18n = I18nContext.current();

      if (
        error instanceof BadRequestException &&
        typeof error.getResponse === 'function'
      ) {
        const response = error.getResponse();

        if (
          typeof response === 'object' &&
          response !== null &&
          Array.isArray((response as any).message)
        ) {
          const validationErrors = (response as any)
            .message as ValidationError[];
          throw validationExceptionFactory(validationErrors, i18n!);
        }
      }

      throw error;
    }
  }
}
