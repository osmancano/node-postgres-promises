CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  description VARCHAR,
  category VARCHAR,
  mpaa_rating VARCHAR,
  poster_url VARCHAR,
  rating NUMBER
);

INSERT INTO public.movie (id, category, description, mpaa_rating, name, poster_url, rating)
VALUES (-1, 'Sci-Fi', 'A cool sci fi film', 'R', 'Matrix', 'https://www.movieposter.com/posters/archive/main/9/A70-4902', 10);
