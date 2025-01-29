/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import CustomError from '../../errorHandler/APIError';
import generateToken from '../../utils/generateToken';
import verifyPassword from '../../utils/verifyPassword';
import BaseServices from '../baseServices';
import studentAggregationPipelines from './student.aggregation.pipelines';
import { IStudent } from './student.interfaces';
import Student from './student.model';

class StudentService extends BaseServices<any> {
  constructor(model: any) {
    super(model);
  }

  async login(payload: { emailOrStudentId: string; password: string }) {
    const user = await this.model
      .findOne({
        $or: [{ email: payload.emailOrStudentId }, { studentId: payload.emailOrStudentId }],
      })
      .select('+password');

    if (!user) throw new CustomError(400, 'Wrong Credentials!');
    await verifyPassword(payload.password, user.password);
    const token = generateToken({ _id: user._id, email: user.email, role: 'STUDENT' });

    return {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: 'STUDENT',
      },
    };
  }

  async read(id: string) {
    return this.model.aggregate([
      { $match: { _id: new Types.ObjectId(id) } },
      ...studentAggregationPipelines.mergeCollection(),
    ]);
  }
  async readAll() {
    return this.model.aggregate([...studentAggregationPipelines.mergeCollection()]);
  }

  async update(id: string, payload: Partial<IStudent>): Promise<any> {
    await this._isExists(id);
    const { permanentAddress, presentAddress, ...restFields } = payload;

    const modifiedPayload: Record<string, unknown> = { ...restFields };

    // Partial update permanent Address
    if (permanentAddress && Object.keys(permanentAddress).length) {
      for (const [key, value] of Object.entries(permanentAddress)) {
        modifiedPayload[`permanentAddress.${key}`] = value;
      }
    }

    // Partial update present Address
    if (presentAddress && Object.keys(presentAddress).length) {
      for (const [key, value] of Object.entries(presentAddress)) {
        modifiedPayload[`presentAddress.${key}`] = value;
      }
    }

    // const session = await mongoose.startSession()

    // try {
    //   await session.startTransaction()
    //   await this.model.findByIdAndUpdate(id, modifiedPayload, { new: true, runValidators: true, session })

    //   if (educationalQualifications && Object.keys(educationalQualifications).length) {
    //     const deleteQualification = educationalQualifications.filter(ele => ele.isDelete).map(item => item.name)

    //     const removeQualifications = await this.model.findByIdAndUpdate(
    //       id,
    //       {
    //         $pull: {
    //           educationalQualifications: { name: { $in: deleteQualification } },
    //         },
    //       },
    //       { new: true, runValidators: true, session },
    //     );
    //     if (!removeQualifications) throw new CustomError(400, 'Failed to update student!');

    //     const newQualifications = educationalQualifications.filter(item => !item.isDelete)

    //     const addQualifications = await this.model.findByIdAndUpdate(
    //       id,
    //       { $addToSet: { educationalQualifications: { $each: newQualifications } } },
    //       { new: true, runValidators: true, session },
    //     );

    //     if (!addQualifications) throw new CustomError(400, 'Failed to update student!');
    //   }

    //   await session.commitTransaction();
    // } catch (error) {
    //   await session.abortTransaction();
    //   throw new CustomError(400, 'Failed to update student!');
    // } finally {
    //   await session.endSession();
    // }

    return this.model.findByIdAndUpdate(id, modifiedPayload, { new: true, runValidators: true });
  }
}

const studentServices = new StudentService(Student);

export default studentServices;
