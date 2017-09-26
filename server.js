const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');

const app = express()

const index = require('./controllers/index');

require('ejs')
app.set('view engine', 'ejs');

app.use(session({
  store: new pgSession({
    conString: connectionString,
  }),
  secret: 'phase4ischallenging',
  resave: true,
  cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 },
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(index);

app.use((request, response) => {
  response.status(404).render('not_found', request.session.user)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
