const express = require('express');

const router = express.Router();

const home = require('./home/home');
const albums = require('./albums/albums');
const reviews = require('./reviews/reviews');
const users = require('./users/users');
const signin = require('./users/signin/signin');
const signout = require('./users/signout/signout');
const signup = require('./users/signup/signup');
const auth = require('./auth/auth');

router.use('/', home);
router.use('/albums', albums);
router.use('/reviews', reviews);
router.use('/user', users);
router.use('/sign-in', signin);
router.use('/auth', console.log);
router.use('/sign-out', signout);
router.use('/sign-up', signup);

module.exports = router;
