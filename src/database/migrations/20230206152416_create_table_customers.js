/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('customers', function (table) {
        table.increments('id');
        table.string('email', 255).notNullable();
        table.string('password', 255).notNullable();
        table.string('name', 255).notNullable();
        table.date('datebirth').notNullable();
        table.string('gender', 1).notNullable();
        table.string('country', 255).notNullable();
        table.string('phonenumber', 20).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable('customers');
