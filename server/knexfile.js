// Update with your config settings.

module.exports = {
  test: {
    client: 'postgresql',
    connection: {
      database: 'docker',
      user:     'docker',
      password: 'docker',
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
    connection: {
      database: 'docker',
      user:     'docker',
      password: 'docker',
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
};
