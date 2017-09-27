const express = require('express');

const router = express.Router();

const albumFunctions = require('../../models/albums/queries');
const reviewFunctions = require('../../models/reviews/queries');

router.get('/:albumID', (request, response) => {
  const albumID = request.params.albumID;

  albumFunctions.getByID(albumID, (error, albums) => {
    if (error) {
      response.status(500).render('error', { error });
    } else {
      const album = albums[0];
      displayAlbumSpecificReviews(album.id)
       .then((albumReviews) => {
         response.render('album', { album, reviews: albumReviews });
       })
    }
  });
});

module.exports = router;
