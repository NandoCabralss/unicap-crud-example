import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserCreateBody {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean;
}
