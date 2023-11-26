export class Category {}

const categoriesTable = `
create table categories(
	category_id int generated always as identity primary key,
	category_title varchar(30) not null unique,
	category_created timestamptz not null,
	category_updated timestamptz not null,
	user_id int references users(user_id)
)
`
