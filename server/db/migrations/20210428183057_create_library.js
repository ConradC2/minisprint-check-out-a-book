
exports.up = function(knex) {
    return knex.schema.createTable('books', (table) => {
        table.increments('id').primary();
        table.string('title', 250);
        table.string('author', 250);
        table.string('isbn', 13);
        table.boolean('isCheckedOut').defaultTo(0);
        table.date('due_date');
        table.integer('userID')
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('books')    
};



// * Book Title,
// * Author,
// * ISBN Number (this can be any number for today!),
// * If the book is checked out or not
// * Date due back if checked out
// * UserId of user that checked out the book