import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
enum Role {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
