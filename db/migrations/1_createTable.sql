DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    usuario varchar(25),
    url varchar(1000),
    descripcion varchar(255), 
    likes INT
);