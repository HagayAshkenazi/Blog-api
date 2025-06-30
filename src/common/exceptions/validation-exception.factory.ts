import {
  BadRequestException,
  HttpStatus,
  ValidationError,
} from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { errorObject } from '@/common/helpers/functions';
import { FormattedValidationError } from '@/interfaces';

const translateMessage = async (
  i18n: I18nContext,
  message: string,
): Promise<string> =>
  message.startsWith('common.') ? i18n.translate(message) : message;

export const validationExceptionFactory = async (
  errors: ValidationError[],
  i18n: I18nContext,
): Promise<BadRequestException> => {
  const formattedErrors: FormattedValidationError[] = await Promise.all(
    errors.map(async (error: ValidationError) => {
      const constraints = error.constraints ?? {};

      const translatedErrors = await Promise.all(
        Object.values(constraints).map((message: string) =>
          translateMessage(i18n, message),
        ),
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
