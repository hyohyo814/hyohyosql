create table blogs (
	id SERIAL PRIMARY KEY,
	author text NOT NULL,
	url text NOT NULL,
	title text NOT NULL,
	likes integer DEFAULT 0
	)


