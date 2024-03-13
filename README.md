# Create database

## Create user for DB
```bash
CREATE USER terzoouser WITH PASSWORD 'admin';
```
```bash
ALTER ROLE terzoouser WITH CREATEDB;
```
```bash
CREATE DATABASE terzoodb WITH OWNER terzoouser;
```
