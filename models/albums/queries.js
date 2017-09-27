const { db } = require('../helpers');

const displayAll = () => {
  return db.any(`
    SELECT
      *
    FROM
      albums
  `, []);
};

const displayByTitle = (title) => {
  return db.any(`
    SELECT
      *
    FROM
      albums
    WHERE
      albums.title = $1
  `, [title]);
};

const displayById = (albumID) => {
  return db.any(`
    SELECT
      *
    FROM
      albums
    WHERE
      albums.id = $1
  `, [albumID]);
};

module.exports = {
  displayAll,
  displayByTitle,
  displayById,
};
