import { Controller, UseGuards, Post, Request } from "@nestjs/common";
import { LocalAuthGuard } from "./local/local-auth.guard";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('/session')
  async signIn(@Request() request) {
    return this.authService.signIn(request.user);
  }
}
