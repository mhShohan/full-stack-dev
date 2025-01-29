/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ZodError } from 'zod';
import mongoose from 'mongoose';
import { ErrorRequestHandler } from 'express';
import config from '../config';
import zodErrorSanitize from '../errorHandler/zodErrorSanitize';
import STATUS from '../lib/httpStatus';
import validationError from '../errorHandler/validationError';
import castError from '../errorHandler/castError';
import handleCustomError from '../errorHandler/handleCustomError';
import CustomError from '../errorHandler/customError';

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
  } else if (err?.name === 'ValidationError') {
    const errors = validationError(err as mongoose.Error.ValidationError);

    errorResponse.statusCode = STATUS.BAD_REQUEST;
    errorResponse.message = 'Validation Failed!';
    errorResponse.errors = errors;
  } else if (err?.name === 'CastError') {
    const errors = castError();

    errorResponse.statusCode = STATUS.BAD_REQUEST;
    errorResponse.message = 'Cast Error!';
    errorResponse.errors = errors;
  } else if (err instanceof CustomError) {
    const errors = handleCustomError(err);

    errorResponse.statusCode = err.statusCode;
    errorResponse.message = err.message;
    errorResponse.errors = errors;
  } else if (err?.code === 11000) {
    const [key, value] = Object.entries(err.keyValue)[0];

    errorResponse.statusCode = STATUS.CONFLICT;
    errorResponse.message = 'Duplicate Entities!';
    errorResponse.errors = { [key]: `${value} is Already Exists!` };
  }

  return res.status(errorResponse.statusCode).json(errorResponse);
};

export default globalErrorHandler;
