import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "../auth/auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { VerifyRoles } from "../auth/role.decorators";
import { Role } from "./user.types";

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @VerifyRoles(Role.ADMIN)
  @Get()
  async getAllUsers() {
    const users = await this.userService.findAll();
    return { message: 'Users fetched successfully!', data: users };
  }
}