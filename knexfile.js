// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: "myecommerce",
      user: "postgres",
      password: "myPostgres",
    },
    migrations: {
      directory: `${__dirname}/src/database/migrations`
    }
  },
};
