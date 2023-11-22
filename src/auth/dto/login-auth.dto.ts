import { IsEmail, MinLength } from "class-validator"

export class LoginAuthDto {
  @IsEmail()
	email:string
  
	@MinLength(6, {message: 'Пароль должен содержать не менее 6 символов'})
	password:string
}