import { BadRequestException, ValidationError } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export const validationExceptionFactory = (
  errors: ValidationError[],
  i18n: I18nContext,
): BadRequestException => {
  const formattedErrors = errors.map((error) => {
    const translatedErrors = Object.values(error.constraints ?? {}).map(
      (msg) => {
        if (
          typeof msg === 'string' &&
          (msg.startsWith('validation.') || msg.startsWith('posts.'))
        ) {
          return i18n.t(msg);
        }

        return msg;
      },
    );

    return {
      field: error.property,
      errors: translatedErrors,
    };
  });

  return new BadRequestException({
    message: i18n.t('validation.VALIDATION_FAILED') || 'Validation failed',
    errors: formattedErrors,
  });
};
