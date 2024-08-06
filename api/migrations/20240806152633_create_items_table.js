/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('items', table => {
    table.increments().primary();
    table.integer('user_id').references('id').inTable('users').notNullable();
    table.string('item_name');
    table.string('description');
    table.integer('quantity');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('items', (table) => {
    table.dropForeign('user_id');
  })
    .then(function () {
      return knex.schema.dropTableIfExists('items');
    });
};
