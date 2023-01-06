//// Packages
require("dotenv").config();
const axios = require("axios");
//// Models
const HttpError = require("../models/http-error");
const User = require("../models/user");

exports.addToList = async (req, res, next) => {
  const movieId = req.params.movieId;
  try {
    try {
      const { data: movieRes } = await axios.get(
        `${process.env.TMDB_BASE_URL}/movie/${movieId}?api_key=${process.env.TMDB_KEY}&language=en-US`
      );
    } catch (err) {
      const { data: tvShowRes } = await axios.get(
        `${process.env.TMDB_BASE_URL}/tv/${movieId}?api_key=${process.env.TMDB_KEY}&language=en-US`
      );
    }

    const user = await User.findById(req.userData.userId);
    if (!user) {
      return next(
        new HttpError("Could not find user for the provided id"),
        404
      );
    }

    let action;
    if (user.list.includes(movieId)) {
      action = "REMOVE";
      user.list.pull(movieId);
      await user.save();
    } else {
      action = "ADD";
      user.list.push(movieId);
      await user.save();
    }

    return res.status(200).json({
      message:
        action === "REMOVE"
          ? "Movie removed from list!"
          : "Movie added to list!",
      added: action,
      list: user.list,
    });
  } catch (err) {
    return next(
      new HttpError("Adding movie to list failed, please try again later", 500)
    );
  }
};

exports.getMyList = async (req, res, next) => {
  try {
    const user = await User.findById(req.userData.userId);
    if (!user) {
      return next(
        new HttpError("Could not find user for the provided id", 404)
      );
    }
    const userMoviesList = user.list;

    const myList = [];

    const insertMovies = userMoviesList.map(async (movieId) => {
      try {
        const { data: movieRes } = await axios.get(
          `${process.env.TMDB_BASE_URL}/movie/${movieId}?api_key=${process.env.TMDB_KEY}&language=en-US`
        );
        myList.push(movieRes);
      } catch (err) {
        const { data: tvShowRes } = await axios.get(
          `${process.env.TMDB_BASE_URL}/tv/${movieId}?api_key=${process.env.TMDB_KEY}&language=en-US`
        );
        myList.push(tvShowRes);
      }
    });

    await Promise.all(insertMovies);

    res.status(200).json({ list: myList });
  } catch (err) {
    return next(
      new HttpError("Fetching movie info failed, please try again later", 500)
    );
  }
};

exports.getMovie = async (req, res, next) => {
  const movieId = req.params.movieId;
  try {
    let movie;
    try {
      const { data: movieRes } = await axios.get(
        `${process.env.TMDB_BASE_URL}/movie/${movieId}?api_key=${process.env.TMDB_KEY}&language=en-US`
      );

      movie = movieRes;
    } catch (err) {
      const { data: tvShowRes } = await axios.get(
        `${process.env.TMDB_BASE_URL}/tv/${movieId}?api_key=${process.env.TMDB_KEY}&language=en-US`
      );

      movie = tvShowRes;
    }

    let similarMovies;
    try {
      const { data: similarMoviesRes } = await axios.get(
        `${process.env.TMDB_BASE_URL}/movie/${movieId}/similar?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
      );
      similarMovies = similarMoviesRes.results.splice(0, 6);
    } catch (err) {
      const { data: similarShowsRes } = await axios.get(
        `${process.env.TMDB_BASE_URL}/tv/${movieId}/similar?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
      );
      similarMovies = similarShowsRes.results.splice(0, 6);
    }

    res.status(200).json({ movie, similarMovies });
  } catch (err) {
    return next(
      new HttpError("Fetching movie info failed, please try again later", 500)
    );
  }
};

exports.getMovieGenres = async (req, res, next) => {
  const movieId = req.params.movieId;

  try {
    let movieData;
    try {
      movieRes = await axios.get(
        `${process.env.TMDB_BASE_URL}/movie/${movieId}?api_key=${process.env.TMDB_KEY}&language=en-US`
      );

      movieData = movieRes;
    } catch (err) {
      const tvShowRes = await axios.get(
        `${process.env.TMDB_BASE_URL}/tv/${movieId}?api_key=${process.env.TMDB_KEY}&language=en-US`
      );

      movieData = tvShowRes;
    }

    let movieGenres;
    if (movieData.data.genres.length <= 3) {
      movieGenres = movieData.data.genres;
    } else {
      movieGenres = movieData.data.genres.splice(3);
    }

    res.status(200).json({ genres: movieGenres });
  } catch (err) {
    return next(
      new HttpError("Fetching movie genres failed, please try again later", 500)
    );
  }
};

exports.searchMovie = async (req, res, next) => {
  const search = req.params.text;
  try {
    const movies = await axios.get(
      `${process.env.TMDB_BASE_URL}/search/multi?api_key=${process.env.TMDB_KEY}&language=en-US&query=${search}`
    );
    res.json({ movies: movies.data.results });
  } catch (err) {
    return next(
      new HttpError("Fetching movies failed, please try again later", 500)
    );
  }
};

exports.getTrendingMovies = async (req, res, next) => {
  try {
    const trendingMovies = await axios.get(
      `${process.env.TMDB_BASE_URL}/trending/all/week?api_key=${process.env.TMDB_KEY}&language=en-US`
    );
    res.json({ movies: trendingMovies.data.results });
  } catch (err) {
    return next(
      new HttpError("Fetching movies failed, please try again later", 500)
    );
  }
};

exports.getNetflixOriginalMovies = async (req, res, next) => {
  try {
    const netflixOriginalMovies = await axios.get(
      `${process.env.TMDB_BASE_URL}/discover/tv?api_key=${process.env.TMDB_KEY}&with_network=213`
    );

    res.json({ movies: netflixOriginalMovies.data.results });
  } catch (err) {
    return next(
      new HttpError("Fetching movies failed, please try again later", 500)
    );
  }
};

exports.getTopRatedMovies = async (req, res, next) => {
  try {
    const topRatedMovies = await axios.get(
      `${process.env.TMDB_BASE_URL}/movie/top_rated?api_key=${process.env.TMDB_KEY}&language=en-US`
    );

    res.json({ movies: topRatedMovies.data.results });
  } catch (err) {
    return next(
      new HttpError("Fetching movies failed, please try again later", 500)
    );
  }
};

exports.getActionMovies = async (req, res, next) => {
  try {
    const actionMovies = await axios.get(
      `${process.env.TMDB_BASE_URL}/discover/movie?api_key=${process.env.TMDB_KEY}&with_genres=28`
    );

    res.json({ movies: actionMovies.data.results });
  } catch (err) {
    return next(
      new HttpError("Fetching movies failed, please try again later", 500)
    );
  }
};
exports.getComedyMovies = async (req, res, next) => {
  try {
    const comedyMovies = await axios.get(
      `${process.env.TMDB_BASE_URL}/discover/movie?api_key=${process.env.TMDB_KEY}&with_genres=35`
    );

    res.json({ movies: comedyMovies.data.results });
  } catch (err) {
    return next(
      new HttpError("Fetching movies failed, please try again later", 500)
    );
  }
};
exports.getHorrorMovies = async (req, res, next) => {
  try {
    const horrorMovies = await axios.get(
      `${process.env.TMDB_BASE_URL}/discover/movie?api_key=${process.env.TMDB_KEY}&with_genres=27`
    );

    res.json({ movies: horrorMovies.data.results });
  } catch (err) {
    return next(
      new HttpError("Fetching movies failed, please try again later", 500)
    );
  }
};
exports.getRomanceMovies = async (req, res, next) => {
  try {
    const romanceMovies = await axios.get(
      `${process.env.TMDB_BASE_URL}/discover/movie?api_key=${process.env.TMDB_KEY}&with_genres=10749`
    );

    res.json({ movies: romanceMovies.data.results });
  } catch (err) {
    return next(
      new HttpError("Fetching movies failed, please try again later", 500)
    );
  }
};
exports.getDocumentariesMovies = async (req, res, next) => {
  try {
    const documentariesMovies = await axios.get(
      `${process.env.TMDB_BASE_URL}/discover/movie?api_key=${process.env.TMDB_KEY}&with_genres=99`
    );

    res.json({ movies: documentariesMovies.data.results });
  } catch (err) {
    return next(
      new HttpError("Fetching movies failed, please try again later", 500)
    );
  }
};
