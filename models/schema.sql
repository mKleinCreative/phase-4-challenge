DROP TABLE IF EXISTS albums;
CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  user_image TEXT DEFAULT '/images/default-user.png',
  date_joined TIMESTAMP DEFAULT now()
);

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  album_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  review_text TEXT NOT NULL,
  time_made TIMESTAMP DEFAULT now()
);

ALTER TABLE reviews ADD FOREIGN KEY ("album_id") REFERENCES "albums" ("id") ON DELETE CASCADE;
ALTER TABLE reviews ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;
