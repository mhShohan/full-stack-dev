import asyncHandler from '../lib/asyncHandler';
import STATUS from '../lib/httpStatus';
import sendResponse from '../lib/sendResponse';
import BaseServices from './baseServices';

class BaseController<T> {
  constructor(
    protected services: BaseServices<T>,
    protected name: string,
  ) {
    this.services = services;
    this.name = name;
  }

  public create = asyncHandler(async (req, res) => {
    const result = await this.services.create(req.body);

    sendResponse(res, {
      success: true,
      statusCode: STATUS.CREATED,
      message: `${this.name} Created Successfully`,
      data: result,
    });
  });
}

export default BaseController;
