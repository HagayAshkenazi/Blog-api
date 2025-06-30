export interface FormattedValidationError {
  field: string;
  errors: string[];
}

export interface ErrorObject {
  success: false;
  statusCode: number;
  message: undefined | string | string[];
  errors?: FormattedValidationError[];
}
