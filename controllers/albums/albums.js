const express = require('express');

const router = express.Router();

const albumFunctions = require('../../models/albums/queries');
const reviewFunctions = require('../../models/reviews/queries');


router.get('/:albumID', (request, response) => {
  const albumID = request.params.albumID;
  const user = request.user;

  albumFunctions.displayById(albumID, (error, albums) => {
    if (error) {
      response.status(500).render('error', { error, user });
    } else {
      const album = albums[0];
      reviewFunctions.displayAlbumSpecificReviews(album.id)
        .then((albumReviews) => {
          response.render('album', { album, user, reviews: albumReviews });
        }).catch((displayError) => {
          response.render('error', { error: displayError });
        });
    }
  });
});

router.get('/:id/reviews/new', (request, response) => {
  const albumID = request.params.id
  const user = request.user

  albumFunctions.displayById(albumID, (error, album) => {
    if (error) {
      response.status(500).render('error', { error, user });
    } else {
      const albumForReview = album[0];
      response.render('reviews/create', { user: request.user, album: albumForReview, message: '' });
    }
  });
});

router.post('/:id/reviews/new', (request, response) => {
  const albumID = request.params.id;
  const { review_text } = request.body;
  const userID = request.user.id;
  reviewFunctions.create(userID, albumID, review_text)
    .then((newReview) => {
      response.redirect(`/albums/${albumID}`)
    }).catch((error) => {
      response.render('error', { error, user })
    });
});

module.exports = router;
