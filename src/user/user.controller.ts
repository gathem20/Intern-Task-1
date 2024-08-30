import { Controller, Get, Res } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(private authservice: AuthService) {}
  @Get(':id')
  getuserById(@Res({ passthrough: true }) response: Response) {
    return this.authservice.getuserById(response);
  }
}
