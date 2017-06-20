const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')
const app = express()

require('ejs')
app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (request, response) => {
  response.render('splash')
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
      console.log( '---===request.body===---', request.body )
    }
  })
})

app.get('/signin', (request, response) => {
  response.render('signin')
})

app.post('/signin', (request, response) => {
  console.log( '---===request.body===---', request.body )
  const email = request.body.user_email
  const password = request.body.user_password
  database.User.getUserByEmail( email, (error, userInfo) => {
    console.log( '---===email===---', email )
    if (error) {
      response.status(500).render('error', {error: error})
    } else {
      console.log( '---===userInfo===---', userInfo )
      response.render('profile', {user: userInfo[0]})
    }
  })
})

app.get('/profile/:id', (request, response) => {
  console.log( '---===request.params.id===---', request.params.id )
  const userID = request.params.id
  database.User.getUserById( userID, (error, userInfo) => {
    if (error) {
      response.status(500).render('error', {error: error})
    } else {
      const user = userInfo[0]
      console.log( '---===userInfo===---', userInfo )
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
