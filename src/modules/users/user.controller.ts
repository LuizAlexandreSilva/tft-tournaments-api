import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { UserService } from './user.service';
import User from './entities/user.entity';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import { UpdateUserDTO } from './dtos/UpdateUserDTO';

@Controller('/users')
export class UserController {
  constructor(private readonly usersService: UserService) { }

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.usersService.create(createUserDTO);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDTO: UpdateUserDTO,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDTO);
  }
}
