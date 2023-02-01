## Description

Nest app for budget managment

## Setup local dev environment

### Installation dependecies

```bash
$ npm install
```

### Perform database migration using Prisma CLI

```bash
$ npx prisma migrate dev
```

### Before running the app

Create **.env** file with environemnt variables as in **.env.example** file

### Running the app locally

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Build and run using docker compose

```bash
# run
$ docker compose up
```

### Environment variables

`NODE_ENV`

Used for node.js environment setup

`HTTP_PORT`

Used for providing http port for Nest.js server

`POSTGRES_USER`

Used for database default username

`POSTGRES_PASSWORD`

Used for database password for default user

`POSTGRES_DB`

Used for default database name

`DATABASE_URL`

Used for connection from node.js app to database
