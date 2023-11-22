
export class UserDto {
  user_id:number
	user_email:string
	user_password:string
	user_first_name: string|null
	user_last_name: string|null
	user_username: string|null
	user_created: Date
	user_updated: Date	
}