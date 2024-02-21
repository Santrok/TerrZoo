CREATE USER terzoouser WITH PASSWORD 'admin';
ALTER ROLE terzoouser WITH CREATEDB;
CREATE DATABASE terzoodb WITH OWNER terzoouser;

