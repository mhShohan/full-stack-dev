import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from '../auth/auth-dto/register-user.dto';

@Injectable()
export class UserService {
  createUser(registerUserDto: RegisterUserDto) {
    return { ...registerUserDto };
  }
}
