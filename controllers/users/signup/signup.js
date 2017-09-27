const express = require('express');

const router = express.Router();

const userFunctions = require('../../../models/users/queries.js');

router.get('/', (request, response) => {
  response.render('signup', { user: request.session.user || null, message: '' });
});

router.post('/', (request, response) => {
  const { email, password, name } = request.body;

  userFunctions.getByEmail(email)
  .then((existingUser) => {
    if (existingUser) {
      return response.render('signup', { user: request.session.user || null, message: 'Accout with this email exists' });
    } else if (!existingUser) {
        userFunctions.create(name, email, password)
          .then((newUser) => {
            // create cookie here!
            request.login(newUser, (err) => {
              return response.redirect(`/user/${newUser.id}`)
            });
            response.render('profile', { user: newUser, message: '' });
          })
      .catch((error) => {
        console.log('---===error.message===---', error.message);
      });
    }
  }).catch((error) => {
    console.log('---===error.message===---', error.message);
  });
});

module.exports = router;
