export interface ErrorObject {
    success: false;
    statusCode: number;
    message: string | string[];
}

export function errorObject(
    statusCode: number,
    message: string | string[]
): ErrorObject {
    return {
        success: false,
        statusCode,
        message,
    };
}