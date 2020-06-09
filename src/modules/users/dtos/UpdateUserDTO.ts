import { IsEmail, IsNotEmpty } from 'class-validator';
export class UpdateUserDTO {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  oldPassword?: string;

  password?: string;

  passwordConfirmation?: string;
}
