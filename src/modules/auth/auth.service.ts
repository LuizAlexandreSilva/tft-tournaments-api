import { Injectable } from '@nestjs/common';
import { UserService } from 'modules/users/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import User from 'modules/users/entities/user.entity';

interface UserAuthenticated {
  user: User;
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findByUserName(username);

    const comparePass = await compare(password, user.password);
    if (user && comparePass) {
      delete user.password;
      return user;
    }

    return null;
  }

  async signin(user: User): Promise<UserAuthenticated> {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }
}
