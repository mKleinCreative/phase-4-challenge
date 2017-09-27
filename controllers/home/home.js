const express = require('express');

const router = express.Router();

const albumFunctions = require('../../models/albums/queries');
const reviewFunctions = require('../../models/reviews/queries');

router.get('/', (request, response) => {
  albumFunctions.displayAll((error, albums) => {
    if (error) {
      response.status(500).render('error', { error });
    } else {
      reviewFunctions.displayRecent()
        .then((recentReviews) => {
          console.log( '---===recentReviews===---', recentReviews ); 
          response.render('index', { albums, user: request.user || null, reviews: recentReviews });
        }).catch((recentReviewError) => {
          response.render('error', { error: recentReviewError, user: request.user || null });
        });
    }
  });
});

module.exports = router;
