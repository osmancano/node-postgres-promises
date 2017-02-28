var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:admin@localhost:5432/postgres';
var db = pgp(connectionString);

// add query functions

module.exports = {
  getAllMovies: getAllMovies,
  getSingleMovie: getSingleMovie,
  createMovie: createMovie,
  updateMovie: updateMovie,
  removeMovie: removeMovie
};

function getAllMovies(req, res, next) {
  db.any('select * from public.movies')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL movies'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleMovie(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.one('select * from public.movies where id = $1', pupID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createMovie(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into Movies(name, description, category, mpaa_rating, poster_url, rating)' +
      'values(${name}, ${description}, ${category}, ${mpaa_rating}, ${poster_url}, ${rating})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one movie'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateMovie(req, res, next) {
  db.none('update public.movies set name=$1, description=$2, category=$3, mpaa_rating=$4, poster_url=$5, rating=$6 where id=$5',
    [req.body.name, req.body.breed, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated movie'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeMovie(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.result('delete from movies where id = $1', pupID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} movie`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}
