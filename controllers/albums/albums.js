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

module.exports = router;
