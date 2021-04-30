
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { firstName: 'Curtis', lastName: 'Conrad', librarian: false},
        { firstName: 'Gordon', lastName: 'Deng', librarian: false},
        { firstName: 'Antoine', lastName: 'Davis', librarian: false},
        { firstName: 'Jeff', lastName: 'Haddock', librarian: true},
        { firstName: 'Greg', lastName: 'Oladipo', librarian: false},
        { firstName: 'Zach', lastName: 'Mansell', librarian: false},
      ]);
    });
};
