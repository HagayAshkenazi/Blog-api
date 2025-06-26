import { FormattedValidationError } from '../exceptions/validation-exception.factory';

export interface ErrorObject {
  success: false;
  statusCode: number;
  message: undefined | string | string[];
  errors?: FormattedValidationError[];
}

export const errorObject = (
  statusCode: number,
  message: undefined | string | string[],
  errors?: FormattedValidationError[],
): ErrorObject => ({
  success: false,
  statusCode,
  message,
  ...(errors?.length ? { errors } : {}),
});
