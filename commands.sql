create table blogs (
	id SERIAL PRIMARY KEY,
	author text NOT NULL,
	url text NOT NULL,
	title text NOT NULL,
	likes integer default 0
);

insert into blogs (author, url, title) values ('Dan Abramov', 'url1', 'On let vs
Const');

insert into blogs (author, url, title) values ('Laurenz Albe', 'url2', 'Gaps in s
equences in PostgreSQL');