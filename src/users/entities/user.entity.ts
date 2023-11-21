export class User {}

const usersTable = `
create table users(
	user_id int generated always as identity primary key,
	user_email text not null unique,
	user_password text not null,
	user_first_name varchar(20),
	user_last_name varchar(30),
	user_username varchar(30),
	user_created date not null,
	user_updated date not null	
)

create table users_categories(
	users_categories_id int generated always as identity primary key,
	user_id int references users(user_id),
	category_id int references categories(category_id)
)
`