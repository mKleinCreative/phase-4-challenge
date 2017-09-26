const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const userFunctions = require('../../../models/users/queries.js');

router.get('/', (request, response) => {
  response.render('/signup', { user: request.session.user || null, message: '' });
});

router.post('/', (request, response) => {
  const { name, email, password } = request.body;

  userFunctions.getByEmail(email)
  .then((existingUser) => {
    if (existingUser) {
      return response.render('users/signup', { user: request.session.user || null, message: 'Accout with this email exists' });
    } else if (!existingUser) {
        userFunctions.create(email, password)
          .then((newUser) => {
            // create cookie here!
            request.login(newUser, (err) => {
              if (err) { return next(err); }
              return response.redirect('/profile')
            });
            response.render('users/profile', { user: newUser, message: '' });
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
