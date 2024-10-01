DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_database WHERE datname = 'usersdb'
    ) THEN
        PERFORM dblink_exec('dbname=postgres', 'CREATE DATABASE usersdb');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_roles WHERE rolname = 'root'
    ) THEN
        CREATE USER root WITH PASSWORD 'root';
    END IF;
END $$;

GRANT ALL PRIVILEGES ON DATABASE usersdb TO root;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    phone VARCHAR(11) NOT NULL,
    age INTEGER NOT NULL,
    country VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    user_role VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

