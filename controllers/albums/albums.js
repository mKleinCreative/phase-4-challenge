const express = require('express');

const router = express.Router();

const albumFunctions = require('../../models/albums/queries');

router.get('/:albumID', (request, response) => {
  const albumID = request.params.albumID;

  albumFunctions.getByID(albumID, (error, albums) => {
    if (error) {
      response.status(500).render('error', { error });
    } else {
      const album = albums[0];
      response.render('album', { album });
    }
  });
});

module.exports = router;
