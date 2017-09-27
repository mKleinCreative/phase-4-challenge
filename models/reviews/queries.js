const { db } = require('../helpers');

const displayAll = () => {
  return db.any(`
    SELECT
      *
    FROM
      reviews
  `, []);
};

const displayRecent = () => {
  return db.any(`
    SELECT
      *
    FROM
      reviews
    INNER JOIN
      users
    ON
      reviews.user_id=users.id
    INNER JOIN
      albums
    ON
      reviews.album_id=albums.id
    ORDER BY
      reviews.id desc
    LIMIT 3
  `, []);
};

const create = (user_id, album_id, title, body) => {
  return db.any(`
    INSERT INTO
      reviews(user_id, album_id, title, body)
    VALUES 
      ($1, $2, $3, $4)
  `, [user_id, album_id, title, body])
};

const displaySingleReview = (id) => {
  return db.one(`
    SELECT
      *
    FROM
      reviews
    WHERE
    reviews.id = $1
  `, [id])
};

const displayUserSpecificReviews = (user_id) => {
  return db.any(`
    SELECT
      *
    FROM
      reviews
    WHERE
      reviews.user_id = $1
  `, [user_id]);
};

const displayAlbumSpecificReviews = (album_id) => {
  return db.any(`
    SELECT
      *
    FROM
      reviews
    WHERE
      reviews.album_id = $1
  `, [album_id]);
};

const deleteReview = (id) => {
  return db.none(`
    DELETE FROM
      reviews
    WHERE
      reviews.id = $1
  `, [id]);
};


module.exports = {
  displayAll,
  create,
  displayRecent,
  displaySingleReview,
  displayUserSpecificReviews,
  displayAlbumSpecificReviews,
  deleteReview,
};
