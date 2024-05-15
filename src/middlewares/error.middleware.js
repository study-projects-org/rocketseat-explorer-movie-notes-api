import { AppError } from '../errors/app-error.js'

export function errorMiddleware(error, request, response, next) {

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  console.error('middleware-error', error);

  return response.status(500).json({
    status: 'Error',
    message: 'Internal server error'
  });
}