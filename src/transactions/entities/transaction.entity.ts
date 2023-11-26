export class Transaction {}

const transactionTable =`
create table transactions(
	transaction_id int generated always as identity primary key,
	transaction_title text not null,
	transaction_type varchar(15) check(transaction_type in ('income','expense')),
	transaction_category int references categories(category_id),
	transaction_amount int not null,
	transaction_user int references users(user_id),
	transaction_created timestamptz not null,
	transaction_updated timestamptz not null	
)
`