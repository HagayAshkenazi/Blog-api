import { BadRequestException, ValidationError } from '@nestjs/common';

export function validationExceptionFactory(
  errors: ValidationError[],
): BadRequestException {
  const formattedErrors = errors.map((error) => ({
    field: error.property,
    errors: Object.values(error.constraints ?? {}),
  }));

  return new BadRequestException({
    message: 'Validation failed',
    errors: formattedErrors,
  });
}
