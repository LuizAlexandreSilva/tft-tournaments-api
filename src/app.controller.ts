import { Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from 'modules/auth/auth.service';
import { LocalAuthGuard } from 'modules/auth/local-auth.guard';
import User from 'modules/users/entities/user.entity';

interface UserAuthenticated {
  user: User;
  accessToken: string;
}
@Controller()
export class AppController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('/session')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async signIn(@Request() request): Promise<UserAuthenticated> {
    return this.authService.signin(request.user);
  }
}
