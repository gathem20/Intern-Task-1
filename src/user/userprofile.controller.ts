import { Body, Controller, Get, Param, Patch, Res } from '@nestjs/common';
import { UserService } from './userprofile.service';
import { updateProfileDto } from './dto/update.dto.user';
// import { updateProfileDto } from './dto/update.dto.user';

@Controller('profile')
export class UserController {
  constructor(private userservice: UserService) {}
 
  @Get('profile')
  async getProfile(@Res() response: Response) {
    return 
  }


}
