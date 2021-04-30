// Update with your config settings.
require('dotenv').config();

const connection = process.env.DB_CONNECTION_STRING;

module.exports = {
  test: {
    client: 'postgresql',
    connection: {
      database: 'docker',
      user:     'docker',
      password: 'password',
      host: '127.0.0.1',
      port: '5432'
    },    
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  development: {
    client: 'postgresql',
    connection,
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },
};
