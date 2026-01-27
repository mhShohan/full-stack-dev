import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterUserDto } from './auth-dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './auth-dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

  async register(registerUserDto: RegisterUserDto) {
    // Hash the password
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

    // Create the user
    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hashedPassword,
    });

    // Generate JWT token
    const jwtPayload = { sub: user._id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(jwtPayload);

    return {
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      accessToken: token
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByEmail(loginUserDto.email);

    // Check if user exists
    if (!user) {
      throw new BadRequestException('Invalid credentials', {
        cause: new Error(),
        description: 'Email or password is incorrect',
      });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials', {
        cause: new Error(),
        description: 'Email or password is incorrect',
      })
    }

    // Generate JWT token
    const jwtPayload = { sub: user._id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(jwtPayload);

    return {
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      accessToken: token
    }
  }
}
