
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('books').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
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
};


