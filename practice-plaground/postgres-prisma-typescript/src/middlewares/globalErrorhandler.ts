/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import APIError from '../errorHandler/APIError';
import handleCustomError from '../errorHandler/handleCustomError';
import zodErrorSanitize from '../errorHandler/zodErrorSanitize';
import STATUS from '../lib/httpStatus';

const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const errorResponse = {
    success: false,
    statusCode: 500,
    message: 'Internal Server Error!',
    errors: {},
    stack: config.NODE_ENV === 'dev' ? err.stack : null,
  };

  // console.log(err);

  if (err instanceof ZodError) {
    const errors = zodErrorSanitize(err);

    errorResponse.statusCode = STATUS.BAD_REQUEST;
    errorResponse.message = 'Validation Failed!';
    errorResponse.errors = errors;
  } else if (err instanceof APIError) {
    const errors = handleCustomError(err);

    errorResponse.statusCode = err.statusCode;
    errorResponse.message = err.message;
    errorResponse.errors = errors;
  }

  return res.status(errorResponse.statusCode).json(errorResponse);
};

export default globalErrorHandler;
