const pg = require('pg')

const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const client = new pg.Client(connectionString)

client.connect()

// Query helper function
const query = function(sql, variables, callback){
  console.log('QUERY ->', sql.replace(/[\n\s]+/g, ' '), variables)

  client.query(sql, variables, function(error, result){
    if (error){
      console.log('QUERY <- !!ERROR!!')
      console.error(error)
      callback(error)
    }else{
      console.log('QUERY <-', JSON.stringify(result.rows))
      callback(error, result.rows)
    }
  })
}

const User = {
  createUser: function(userInfo, callback) {
    query(
      `INSERT INTO
      users ( name, email, password, date_joined )
      VALUES
      ( $1, $2, $3, $4 )
      RETURNING id`, userInfo, callback
    )
  },

  getUserById: function(userInfo, callback) {
    query( "SELECT * FROM users WHERE id = $1", [userInfo], callback )
  },

  getUserByEmail: function(userInfo, callback) {
    query( "SELECT * FROM users WHERE email = $1", [userInfo], callback )
  }
}

const getAlbums = function(callback) {
  query("SELECT * FROM albums", [], callback)
}

const getAlbumsByID = function(albumID, callback) {
  query("SELECT * FROM albums WHERE id = $1", [albumID], callback)
}

module.exports = {
  getAlbums,
  getAlbumsByID,
  User
}
