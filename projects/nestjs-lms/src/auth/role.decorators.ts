import { SetMetadata } from '@nestjs/common'
import { Role } from '../user/user.types';

export const ROLES_KEY = 'roles';
export const VerifyRoles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);