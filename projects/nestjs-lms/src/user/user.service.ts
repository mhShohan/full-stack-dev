import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from '../auth/auth-dto/register-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async createUser(registerUserDto: RegisterUserDto) {
    try {
      const createdUser = new this.userModel(registerUserDto);
      return await createdUser.save()
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      }
    }
  }
}
