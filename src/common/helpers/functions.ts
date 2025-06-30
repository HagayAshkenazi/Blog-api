import { ErrorObject, FormattedValidationError } from 'src/interfaces';

export const errorObject = (
  statusCode: number,
  message: undefined | string | string[],
  errors?: FormattedValidationError[],
): ErrorObject => ({
  message,
  statusCode,
  ...(errors?.length ? { errors } : {}),
});
