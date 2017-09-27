const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const session = require('cookie-session');

const userFunctions = require('../../models/users/queries');
const reviewFunctions = require('../../models/reviews/queries');

router.post('/:id/delete', (request, response) => {
  const { id } = request.params;
  console.log( '---===request.params===---', request.params ); 
  reviewFunctions.deleteReview(id)
    .then(() => {
      response.redirect(`/`);
    }).catch((error) => {
      response.render('error', { error, user: request.user });
    });
});

module.exports = router;