const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const database = require('./database')
const app = express()

require('ejs')
app.set('view engine', 'ejs');

app.use(session({secret: 'iambatman'}));

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

var sess;

app.get('/', (request, response) => {
  sess = request.session
  sess.email
  sess.name
  if(sess.email) {
    response.redirect('profile/:id')
  } else {
    response.render('splash')
  }
})

app.get('/signup', (request, response) => {
  response.render('signup')
})

app.post('/signup/submit', (request, response) => {
  let now = new Date()
  let dateJoined = now
  let { name, email, password } = request.body
  let userInfo = [ name, email, password, dateJoined ]
  database.User.createUser( userInfo, (error, user) => {
    if (error) {
      response.status(500).render('error', {error: error})
    } else {
      response.redirect('/profile')
    }
  })
})

app.get('/signin', (request, response) => {
  response.render('signin')
})

app.post('/signin', (request, response) => {
  sess = request.session
  const email = request.body.user_email
  const password = request.body.user_password
  database.User.getUserByEmail( email, (error, userInfo) => {
    if (error) {
      response.status(500).render('error', {error: error})
    } else {
      response.render('profile', {user: userInfo[0]})
    }
  })
})

app.get('/logout', (request,response) => {
  request.session.destroy(( error) => {
    if (error) {
      console.log(error);
    } else {
    response.redirect('/');
    }
  })
})

app.get('/profile/:id', (request, response) => {
  const userID = request.params.id
  database.User.getUserById( userID, (error, userInfo) => {
    if (error) {
      response.status(500).render('error', {error: error})
    } else {
      const user = userInfo[0]
      response.render('profile', {user: user})
    }
  })
})


app.get('/albums', (request, response) => {
  database.getAlbums((error, albums) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      response.render('index', { albums: albums })
    }
  })
})

app.get('/albums/:albumID', (request, response) => {
  const albumID = request.params.albumID

  database.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      const album = albums[0]
      response.render('album', { album: album })
    }
  })
})

app.use((request, response) => {
  response.status(404).render('not_found')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
