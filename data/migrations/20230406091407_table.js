/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("starwars", (tbl) => {
    tbl.increments();
    tbl.string("name", 128).notNullable().unique();
    tbl.string("homeworld").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("starwars");
};
