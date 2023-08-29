// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    migrations: { directory: "./data/migrations" },
    seeds: { directory: "./data/seeds" },
    connection: {
      filename: "./dev.sqlite3",
    },
  },

  testing: {
    client: "sqlite3",
    useNullAsDefault: true,
    migrations: { directory: "./data/migrations" },
    seeds: { directory: "./data/seeds" },
    connection: {
      filename: "./data/test.db3",
    },
  },
};
