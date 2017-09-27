const { query } = require('../helpers');

const displayAll = (callback) => {
  query(`
    SELECT
      *
    FROM
      albums
  `, [], callback);
};

const displayById = (albumID, callback) => {
  query(`
    SELECT
      *
    FROM
      albums
    WHERE
      albums.id = $1
  `, [albumID], callback);
};

module.exports = {
  displayAll,
  displayById,
};
