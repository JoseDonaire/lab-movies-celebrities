const router = require("express").Router();
const Movie = require("../models/Movie.model.js");
const Celebrity = require('../models/Celebrity.model.js')

// Crear películas
router.get("/create", (req, res, next) => {
  Celebrity.find().select('name')
  .then((nameCelebrity)=>{
    res.render("movies/new-movie.hbs", {
        nameCelebrity
    })
  })
  .catch((err)=>{
    next(err)
  })
})

router.post("/create", (req, res, next) => {

  const { title, genre, plot,cast } = req.body
  Movie.create({
    title,
    genre,
    plot,
    cast
  })
  .then(() => {
    res.redirect("/movies")
  })
  .catch((err) => {
    next(err)
  })
})

// lista de peliculas
router.get("/", (req, res, next) => {

  Movie.find().select('title')
  .then((moviesList) => {
    res.render("movies/movies.hbs", {
        moviesList
    })
  })
  .catch((err) => {
    next(err)
  })
})

// detalle de cada película
router.get("/:movieId/details", (req, res, next) => {
  const {movieId} = req.params
  Movie.findById(movieId).populate("movie")
  .then((movieDetails) => {
    res.render("movies/movie-details.hbs", {
      movieDetails
    })
  }).catch((err) => {
    next(err)
  })
})
// borrar

router.post("/:movieId/delete", (req, res, next) => {
  const {movieId} = req.params
  Movie.findByIdAndDelete(movieId)
  .then((movieDetails) => {
    res.render("movies/movie-details.hbs", {
      movieDetails
    })
  }).catch((err) => {
    next(err)
  })
})

//editar películas

router.post("/:movieId/edit", (req, res, next) => {
  const {movieId} = req.params
  const {title, genre,plot,cast} =req.body
  Movie.findByIdAndUpdate(movieId, {title, genre,plot,cast})
  .then(() => {
    res.redirect(`/movies/${movieId}/details`)
  })
  .catch((err) => {
    next(err)
  })
})


module.exports = router;