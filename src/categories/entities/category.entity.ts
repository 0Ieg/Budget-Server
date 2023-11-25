export class Category {}

const categoriesTable = `
create table categories(
	category_id int generated always as identity primary key,
	category_title varchar(30) not null unique,
	category_created date not null,
	category_updated date not null,
	user_id int references users(user_id)
)
`
