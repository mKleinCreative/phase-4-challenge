const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const session = require('cookie-session');

const router = express.Router();

const userFunctions = require('../../database/controllers/user');
const reviewFunctions = require('../../database/controllers/review');
const login = require('../login/login');

router.post('/', (request, response) => {
  const { email, password, confirmPassword } = request.body;
  const validatePassword = password === confirmPassword;

  if (!validatePassword) {
    return response.render('users/signup', { user: request.session.user || null, message: 'Passwords don\'t match' });
  }
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

router.get('/:user_id/reviews', (request, response) => {
  const { user_id } = request.params;
  reviewFunctions.displayUserSpecificReviews(user_id)
    .then((userReviews) => {
      response.json({ userReviews });
    });
});

module.exports = router;

module.exports = router;
