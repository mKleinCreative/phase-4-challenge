const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const session = require('cookie-session');

const userFunctions = require('../../models/users/queries');
const reviewFunctions = require('../../models/reviews/queries');

router.get('/:user_id', (request, response) => {
  const { user_id } = request.params;
  userFunctions.getById(user_id)
    .then((requestedUser) => {
      response.render('profile', { user: requestedUser });
    });
});

router.get('/:user_id/reviews', (request, response) => {
  const { user_id } = request.params;
  reviewFunctions.displayUserSpecificReviews(user_id)
    .then((userReviews) => {
      response.json({ userReviews });
    });
});

module.exports = router;
