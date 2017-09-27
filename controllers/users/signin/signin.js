const express = require('express');

const passport = require('passport');

const router = express.Router();

router.get('/', (request, response) => {
  response.render('signin', { user: request.session.user || null, message: '' });
});

router.post('/', (request, response, next) => {

  passport.authenticate('local',  (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return response.render('signin', { user: request.session.user || null, message: 'Invalid Email or Password' }); }
    request.login(user, (err) => {
      if (err) { return next(err); }
      return response.redirect(`/user/${user.id}`)
    });
  })(request, response, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;