import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator"

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(30)
  password

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(30)
  confirm_password

  @IsNotEmpty()
  @MinLength(2)
  first_name
}