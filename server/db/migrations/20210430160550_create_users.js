
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('firstName', 250);
      table.string('lastName', 250);
      table.boolean('librarian').defaultTo(0);
  }).alterTable('books', (table) => {
    table.integer('userID').unsigned().alter();
    table.foreign('userID').references('users.id');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
    .alterTable('books', (table) => {
        table.dropForeign('userID');
    })
};

//creating a new users table
//modify the 'books' table to associate userId with the users table
  //make the userId column a foreign key
//this will allow the librarian to view the name of the person that checked out the book.
//
//books                   users
// - title                   firstname
// - author                  lastname
// - isbn                    Library
// - userId ---->(foreign)   id
// - isCheckedout

// book[]