CREATE TABLE IF NOT EXISTS tasks (
    account_id INT NOT NULL PRIMARY KEY,
    content varchar(250) NOT NULL,
    status varchar(250) NOT NULL
);
