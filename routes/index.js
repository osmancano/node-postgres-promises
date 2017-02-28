var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/api/movies', db.getAllMovies);
router.get('/api/movies/:id', db.getSingleMovie);
router.post('/api/movies', db.createMovie);
router.put('/api/movies/:id', db.updateMovie);
router.delete('/api/movies/:id', db.removeMovie);


module.exports = router;
