import { Controller, Get, Res } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userservice: UserService) {}
  @Get(':id')
  getUserById(@Res({ passthrough: true }) response: Response) {
    return this.userservice.getuserById(response);
  }
}
