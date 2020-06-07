import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import User from './entities/user.entity';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import { UpdateUserDTO } from './dtos/UpdateUserDTO';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const { name, email, password, username } = createUserDTO;

    const emailInUse = await this.usersRepository.findOne({
      where: { email },
    });

    if (emailInUse) {
      throw new BadRequestException('E-mail is already in use.');
    }

    const usernameInUse = await this.usersRepository.findOne({
      where: { username },
    });

    if (usernameInUse) {
      throw new BadRequestException('Username is already in use.');
    }

    const hashedPassword = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      username,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    return user;
  }

  async update(id: number, updateUserDTO: UpdateUserDTO): Promise<User> {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    const { name, email, password, oldPassword } = updateUserDTO;

    const userWithUpdatedEmail = await this.usersRepository.findOne({
      where: { email },
    });

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== Number(id)) {
      throw new BadRequestException('E-mail is already in use.');
    }

    user.name = name;
    user.email = email;

    if (password && !oldPassword) {
      throw new BadRequestException('You need to inform old password');
    }

    if (password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password);
      if (!checkOldPassword) {
        throw new BadRequestException('Old password does not match');
      }
      user.password = await hash(password, 8);
    }

    return this.usersRepository.save(user);
  }

  async findById(id: number): Promise<User> {
    const user = this.usersRepository.findOne(id);

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    return user;
  }

  async findByUserName(username: string): Promise<User> {
    const user = this.usersRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    return user;
  }
}
