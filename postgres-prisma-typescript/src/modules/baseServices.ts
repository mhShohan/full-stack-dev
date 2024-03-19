/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomError from '../errorHandler/APIError';
import STATUS from '../lib/httpStatus';

class BaseServices {

  // async create(payload: any) {
  //   return
  // }

  // async readById(id: string) {
  //   await this._isExists(id);
  //   return
  // }

  // async readAll(query: Record<string, unknown> = {}): Promise<any> {
  //   return
  // }

  // async update(id: string, payload: any) {
  //   await this._isExists(id);
  //   return
  // }

  // async delete(id: string) {
  //   await this._isExists(id);
  //   return
  // }

  protected async _isExists(id: string) {
    if (id === '') {
      throw new CustomError(STATUS.NOT_FOUND, 'Data is not found!', 'NOT_FOUND');
    }
  }
}

export default BaseServices;
