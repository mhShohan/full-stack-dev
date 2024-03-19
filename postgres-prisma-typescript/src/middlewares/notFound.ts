import { Request, Response } from 'express';
import STATUS from '../lib/httpStatus';

const notFound = (_req: Request, res: Response) => {
  return res.status(STATUS.NOT_FOUND).json({
    success: false,
    statusCode: STATUS.NOT_FOUND,
    message: '404! Resource not found...',
  });
};

export default notFound;
