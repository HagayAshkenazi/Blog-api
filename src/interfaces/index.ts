export interface FormattedValidationError {
  field: string;
  errors: string[];
}

export interface ErrorObject {
  success?: false;
  statusCode: number;
  message: undefined | string | string[];
  errors?: FormattedValidationError[];
}

export interface AppException extends Error {
    status?: number;
    getErrorStatus?: () => number;
    getErrorNumber?: () => number;
    message: string;
    stack?: string;
}

export interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  errors?: AppException;
}
