import {
  BadRequestException,
  HttpStatus,
  ValidationError,
} from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { errorObject } from 'src/common/helpers/functions';

export interface FormattedValidationError {
  field: string;
  errors: unknown[];
}

export const validationExceptionFactory = (
  errors: ValidationError[],
  i18n: I18nContext,
): BadRequestException => {
  const formattedErrors: FormattedValidationError[] = errors.map((error) => {
    const translatedErrors = (
      Object.values(error.constraints ?? {}) as string[]
    ).map((msg) => {
      if (
        typeof msg === 'string' &&
        (msg.startsWith('validation.') || msg.startsWith('posts.'))
      ) {
        return i18n.t(msg);
      }

      return msg;
    });

    return {
      field: error.property,
      errors: translatedErrors,
    };
  });

  return new BadRequestException(
    errorObject(
      HttpStatus.BAD_REQUEST,
      'validation.VALIDATION_FAILED',
      formattedErrors,
    ),
  );
};
