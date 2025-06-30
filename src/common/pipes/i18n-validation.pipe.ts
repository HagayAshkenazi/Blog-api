import {
  Injectable,
  ValidationPipe,
  ValidationError,
  BadRequestException,
} from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { validationExceptionFactory } from '@/common/exceptions/validation-exception.factory';

@Injectable()
export class I18nValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: async (
        errors: ValidationError[],
      ): Promise<BadRequestException> => {
        const i18n = I18nContext.current();

        return validationExceptionFactory(errors, i18n!);
      },
    });
  }
}
