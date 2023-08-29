/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("starwars").truncate();
  await knex("starwars").insert([
    { id: 1, name: "Luke Skywalker", homeworld: "Tatooine" },
    { id: 2, name: "Leia Organa", homeworld: "Alderaan" },
    { id: 3, name: "Obi-Wan Kenobi", homeworld: "Stewjon" },
  ]);
};
