import {
  BadRequestException,
  HttpStatus,
  ValidationError,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { errorObject } from '@/common/helpers/functions';
import { FormattedValidationError } from '@/interfaces';

const translateMessage = async (
  i18n: I18nService,
  message: string,
): Promise<string> => {
  if (!message.startsWith('common.')) return message;

  const [key, forbiddenWords] = message.split('|');

  return i18n.translate(key, {
    args: {
      words: forbiddenWords ?? '',
    },
  });
};

export const validationExceptionFactory = async (
  errors: ValidationError[],
  i18n: I18nService,
): Promise<BadRequestException> => {
  const formattedErrors: FormattedValidationError[] = await Promise.all(
    errors.map(async (error: ValidationError) => {
      const constraints = error.constraints ?? {};

      const translatedErrors = await Promise.all(
        Object.values(constraints).map(async (message: string) => {
          return await translateMessage(i18n, message);
        }),
      );

      return {
        field: error.property,
        errors: translatedErrors.filter(Boolean),
      };
    }),
  );

  const message = await i18n.translate('common.validation.VALIDATION_FAILED');

  return new BadRequestException(
    errorObject(HttpStatus.BAD_REQUEST, message, formattedErrors),
  );
};
