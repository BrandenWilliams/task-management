CREATE TABLE IF NOT EXISTS accounts (
    ID SERIAL PRIMARY KEY,
    email varchar(25) NOT NULL UNIQUE,
    password varchar(250) NOT NULL
);

CREATE TABLE IF NOT EXISTS tasks (
    account_id INT NOT NULL PRIMARY KEY,
    content varchar(250) NOT NULL,
    status varchar(250) NOT NULL
);
