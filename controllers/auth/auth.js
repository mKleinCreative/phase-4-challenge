const bcrypt = require('bcrypt');
const {
  getByEmail,
  getById,
} = require('../../models/users/queries');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  (email, password, done) => {
    getByEmail(email)
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Incorrect user email' });
        }
        bcrypt.compare(password, user.password, (error, result) => {
          if (error) {
            return done(error);
          }
          if (!result) {
            return done(null, false);
          }
          return done(null, user);
        })
      })
      .catch((error) => {
        return done(null, false, { message: 'Incorrect user email' });
      })
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser((userId, done) => {
  getById(userId)
    .then((user) => {
      done(null, user);
    })
})


module.exports = { passport };