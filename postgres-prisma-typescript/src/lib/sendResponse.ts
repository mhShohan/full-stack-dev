import { Response } from 'express';

interface Meta {
  limit: number;
  page: number;
  totalPage: number;
  totalCount: number;
}

interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: Meta;
  data: T;
}

const sendResponse = <T>(res: Response, responses: IResponse<T>) => {
  return res.status(responses.statusCode).json({
    statusCode: responses.statusCode,
    success: responses.success,
    message: responses.message,
    meta: responses.meta,
    data: responses.data,
  });
};

export default sendResponse;
