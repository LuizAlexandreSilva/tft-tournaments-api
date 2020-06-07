export class UpdateUserDTO {
  name: string;

  email: string;

  oldPassword?: string;

  password?: string;

  passwordConfirmation?: string;
}
