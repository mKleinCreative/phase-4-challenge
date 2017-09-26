const express = require('express');

const router = express.Router();

const home = require('./home/home');
const albums = require('./albums/albums');
const users = require('./users/users');
const signin = require('./users/signin/signin');
const signout = require('./users/signout/signout');
const signup = require('./users/signup/signup');
const reviews = require('./reviews/reviews');
const auth = require('./auth/auth');

router.use('/', home);
router.use('/auth', auth);
router.use('/albums', albums);
router.use('/users', users);
router.use('/sign-in', signin);
router.use('/sign-out', signout);
router.use('/sign-up', signup);
router.use('/reviews', reviews);

module.exports = router;
