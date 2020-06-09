import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
