const bcrypt = require('bcrypt');
const { db } = require('../helpers');

const saltRounds = 12;

const create = (name, email, password) => {
  return bcrypt.hash(password, saltRounds)
    .then((hash) => {
      return db.one(`
      INSERT INTO
        users (name, email, password)
      VALUES($1, $2, $3)
      RETURNING *
      `, [name, email, hash]);
    });
};

const getByEmail = (email) => {
  return db.oneOrNone(`
    SELECT *
    FROM users
    WHERE
     email=$1
    `, [email]);
};

const getById = (id) => {
  return db.oneOrNone(`
    SELECT *
    FROM users
    WHERE
     id=$1
     `, [id]);
};

module.exports = {
  create,
  getByEmail,
  getById,
};
