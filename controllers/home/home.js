const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');

const albumFunctions = require('../../models/albums/queries');

router.get('/', (request, response) => {
  const user = request.session.user || {};
  albumFunctions.getAll((error, albums) => {
    if (error) {
      response.status(500).render('error', { error });
    } else {
      response.render('index', { albums, user: '' });
    }
  });
});

module.exports = router;
