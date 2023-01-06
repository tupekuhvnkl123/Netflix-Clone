//// Packages
const express = require("express");
const router = express.Router();

//// Controllers
const moviesControllers = require("../controllers/movies");

//// Middleware
const checkAuth = require("../middleware/check-auth");

//# Checking authentication
router.use(checkAuth);

////Auth Not Required Routes
router.get("/trending", moviesControllers.getTrendingMovies);
router.get("/netflixOriginal", moviesControllers.getNetflixOriginalMovies);
router.get("/topRated", moviesControllers.getTopRatedMovies);
router.get("/action", moviesControllers.getActionMovies);
router.get("/comedy", moviesControllers.getComedyMovies);
router.get("/horror", moviesControllers.getHorrorMovies);
router.get("/romance", moviesControllers.getRomanceMovies);
router.get("/documentaries", moviesControllers.getDocumentariesMovies);
router.get("/myList", moviesControllers.getMyList);
router.get("/search/:text", moviesControllers.searchMovie);
router.get("/:movieId", moviesControllers.getMovie);
router.get("/:movieId/genres", moviesControllers.getMovieGenres);

router.patch("/myList/:movieId", moviesControllers.addToList);

module.exports = router;
