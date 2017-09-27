const express = require('express');

const router = express.Router();

const albumFunctions = require('../../models/albums/queries');

router.get('/', (request, response) => {
  albumFunctions.displayAll((error, albums) => {
    if (error) {
      response.status(500).render('error', { error });
    } else {
      response.render('index', { albums, user: '' });
    }
  });
});

module.exports = router;
