CREATE TABLE IF NOT EXISTS accounts (
    ID SERIAL PRIMARY KEY,
    email varchar(25) NOT NULL UNIQUE,
    password varchar(250) NOT NULL
);

