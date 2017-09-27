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
        });
    }
  });
});

router.get('/:id/reviews/new', (request, response) => {
  albumFunctions.displayById(request.params.id)
    .then((album) => {
      response.render('reviews/create', { user: request.user, album, message: '' });
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
