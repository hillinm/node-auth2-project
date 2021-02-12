const db = require("../../database/connection.js");

module.exports = {
  find,
  create,
  findByUsername,
};

function find() {
  return db('users');
}

function create(user) {
  return db
  .insert(user)
  .into('users')
  .then((response) => {
    return db.select('*').from('users').where({ username }).first();
  });
}

function findByUsername(username) {
  return db.select('*').from('users').where({ username }).first();
}