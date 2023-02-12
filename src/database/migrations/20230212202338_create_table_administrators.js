/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('administrators', function (table) {
        table.increments('id');
        table.string('email', 255).notNullable();
        table.string('password', 255).notNullable();
        table.string('name', 255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = () => knex.schema.dropTable('administrators');
