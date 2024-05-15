
export function up(knex) {
  return knex.schema
    .createTable('users', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.string('avatar').default(null);

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('movie_notes', table => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.integer('rating').default(0);
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('movie_tags', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('note_id').references('id').inTable('movie_notes').onDelete('CASCADE');
      table.integer('user_id').references('id').inTable('users');

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export function down(knex) {
  return knex.schema
    .dropTable('movie_tags')
    .dropTable('movie_notes')
    .dropTable('users');
}



