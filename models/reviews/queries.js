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
      reviews.review_id desc
    LIMIT 3
  `, []);
};

const create = (user_id, album_id, review_text) => {
  return db.any(`
    INSERT INTO
      reviews(user_id, album_id, review_text)
    VALUES 
      ($1, $2, $3)
    RETURNING *
  `, [user_id, album_id, review_text])
};

const displaySingleReview = (review_id) => {
  return db.one(`
    SELECT
      reviews.review_id, users.id
    FROM
      reviews
    INNER JOIN
      users
    ON
      reviews.user_id=users.id
    WHERE
      reviews.review_id = $1
  `, [review_id]);
};

const displayUserSpecificReviews = (user_id) => {
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
    INNER JOIN
      users
    ON
      reviews.user_id=users.id
    WHERE
      reviews.album_id = $1
    ORDER BY
      reviews.review_id
    desc
  `, [album_id]);
};

const deleteReview = (review_id) => {
  return db.any(`
    DELETE FROM
      reviews
    WHERE
      reviews.review_id = $1
  `, [review_id]);
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
