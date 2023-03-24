import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserUpdateBody {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
