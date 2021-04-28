const knex = require('knex');
const config = require('../knexfile');

let db = null;

if(process.env.NODE_ENV === "test") {
    db = knex(config.test);
} else {
    db = knex(config.development);
}


const setupDatabase = async () => {
    await db.schema.hasTable('books').then( exists => {
        if (!exists) {
            return db.schema.createTable('books', table => {
              table.increments('id').primary();
              table.string('title', 250);
              table.string('author', 250);
              table.string('isbn', 13);
              table.boolean('isCheckedOut').defaultTo(0);
              table.date('due_date');
              table.integer('userID')
            })
            .then(() => {
                console.log(`table created and data added.`)
                return db('books').insert([
                  { title: 'Lord of the Rings', author: 'J. R. R. Tolkien' , isbn: '0618645616', isCheckedOut: false},
                  { title: 'The Prince', author: 'Niccolo Machiavelli' , isbn: '1640320199', isCheckedOut: false},
                  { title: 'Becoming', author: 'Michele Obama' , isbn: '1524763136', isCheckedOut: false},
                  { title: 'Promised Land', author: 'Barack Obama' , isbn: '1524763160', isCheckedOut: false},
                  { title: 'Ilium', author: 'Dan Simmons' , isbn: '0380978939', isCheckedOut: false},
                  { title: 'Lord of the Flies', author: 'William Golding' , isbn: '0143124293', isCheckedOut: false},
                  { title: 'Grapes of Wrath', author: 'John Steinbeck' , isbn: '067001690X', isCheckedOut: false},
                  { title: 'Count of Monte Cristo', author: 'Alexander Dumas' , isbn: '9780141392462', isCheckedOut: false},
                  { title: 'The Idiot', author: 'Fyodor Dostoevsky' , isbn: '0375702245', isCheckedOut: false},
                  { title: 'City of Thieves', author: 'David Benioff' , isbn: '0670018703', isCheckedOut: false},
                  ]);
            });
        }
    });

    console.info('Database is setup');

    
} 

const dropDatabase = async () => {
    // drop the database using the existing connection pool
    await db.schema.dropTableIfExists('movies');
    await db.destroy();
    console.info('Database has been dropped');
    return;
}
  
module.exports = { 
    db,
    setupDatabase,
    dropDatabase
};