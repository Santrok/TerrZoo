# Create database
```bash
CREATE USER terzoouser WITH PASSWORD 'admin';
```
```bash
ALTER ROLE terzoouser WITH CREATEDB;
```
```bash
CREATE DATABASE terzoodb WITH OWNER terzoouser;
```
