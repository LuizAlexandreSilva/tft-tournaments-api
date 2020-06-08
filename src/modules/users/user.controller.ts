import { Controller, Post, Body, Put, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import User from './entities/user.entity';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import { UpdateUserDTO } from './dtos/UpdateUserDTO';
import { JwtAuthGuard } from 'modules/auth/jwt/jwt-auth.guard';

@Controller('/users')
export class UserController {
  constructor(private readonly usersService: UserService) { }

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.usersService.create(createUserDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDTO: UpdateUserDTO,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDTO);
  }
}
