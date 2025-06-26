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

export const validationExceptionFactory = async (
  errors: ValidationError[],
  i18n: I18nContext,
): Promise<BadRequestException> => {
  const formattedErrors: FormattedValidationError[] = await Promise.all(
    errors.map(async (error) => {
      const constraints = error.constraints ?? {};

      const translatedErrors = await Promise.all(
        Object.values(constraints).map(async (msg) => {
          if (
            typeof msg === 'string' &&
            (msg.startsWith('validation.') || msg.startsWith('posts.'))
          ) {
            return await i18n.translate(msg);
          }

          return msg;
        }),
      );

      return {
        field: error.property,
        errors: translatedErrors,
      };
    }),
  );

  const message = await i18n.translate('common.validation.VALIDATION_FAILED');

  return new BadRequestException(
    errorObject(HttpStatus.BAD_REQUEST, message, formattedErrors),
  );
};
