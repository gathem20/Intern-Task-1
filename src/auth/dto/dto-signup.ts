import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class signup {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Invalid email format. Email must contain "@" and end with ".com"',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one special character',
  })
  @MinLength(8)
  password: string;
}
