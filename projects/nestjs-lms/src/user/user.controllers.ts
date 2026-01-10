import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "../auth/auth.guard";

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard)
  @Get()
  async getAllUsers() {
    const users = await this.userService.findAll();
    return { message: 'Users fetched successfully!', data: users };
  }
}