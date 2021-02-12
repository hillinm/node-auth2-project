
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'cpowell', password: 'password', department: 'worker'},
        {id: 2, username: 'mhillin', password: 'password', department: 'management'},
        {id: 3, username: 'spowell', password: 'password', department: 'worker'},
      ]);
    });
};
