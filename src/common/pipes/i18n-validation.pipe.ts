import {
  Injectable,
  ValidationPipe,
  ValidationError,
  BadRequestException,
} from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { validationExceptionFactory } from '@/common/exceptions/validation-exception.factory';

@Injectable()
export class I18nValidationPipe extends ValidationPipe {
  constructor(private readonly i18n: I18nService) {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: async (
        errors: ValidationError[],
      ): Promise<BadRequestException> => {
        return await validationExceptionFactory(errors, this.i18n);
      },
    });
  }
}
