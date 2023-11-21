import { IsEmail } from "class-validator"

export class CreateUserDto {
  @IsEmail()
	email:string

	password:string
	first_name:string
	last_name:string
	username:string
	created:Date
	updated:Date
}
