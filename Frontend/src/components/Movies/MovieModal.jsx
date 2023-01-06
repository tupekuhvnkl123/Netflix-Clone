//// Packages
import { useState, useContext } from "react";
import { Modal, Zoom, CircularProgress } from "@mui/material";
import { BsPlusCircle } from "react-icons/bs";
import { useMutation, useQuery } from "react-query";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import {
  Recommend,
  PlayArrowRounded,
  CancelRounded,
  Star,
} from "@mui/icons-material";
//// Components
import SimilarMovieItem from "./SimilarMovieItem";
//// Style
import classes from "../../style/Movies/MovieModal.module.scss";
//// Shared
import { getMovie } from "../../shared/constants/api";
import { AuthContext } from "../../shared/context/auth-context";
import useAddToList from "../../shared/hooks/useAddToList";

const MovieModal = ({ show, onClose, movieId }) => {
  const authCtx = useContext(AuthContext);

  const { isLoading, data, isSuccess } = useQuery(
    movieId.toString(),
    () => getMovie(movieId),
    {
      staleTime: Infinity,
    }
  );
  const { movie } = data || { movie: {} };

  const { addMovieToList, result: addedToList } = useAddToList(movie.id);

  if (isLoading) {
    return (
      <Modal className={classes.modal} open={!!show} onClose={onClose}>
        <Zoom in={!!show}>
          <div className={`${classes.container} ${classes.loading}`}>
            <CircularProgress className={classes.loadingSpinner} />
          </div>
        </Zoom>
      </Modal>
    );
  }

  let releaseDate = movie && (movie.release_date || movie.first_air_date);

  if (isSuccess)
    return (
      <Modal
        disableAutoFocus={true}
        key={movieId}
        className={classes.modal}
        open={!!show}
        onClose={onClose}
      >
        <Zoom in={!!show}>
          <div className={classes.container}>
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0,0), rgba(0, 0, 0, 0) , rgba(20, 20, 20, 0.6) , rgba(20, 20, 20 , 1)), url("https://image.tmdb.org/t/p/original/${
                  movie.backdrop_path || movie.poster_path
                }")`,
              }}
              className={classes.banner}
            >
              <div className={classes.closeBtnContainer}>
                <CancelRounded className={classes.icon} onClick={onClose} />
              </div>
              <div className={classes.mainIconsContainer}>
                <button className={classes.playBtn}>
                  <PlayArrowRounded className={classes.icon} />
                  Play
                </button>
                {authCtx.isLoggedIn &&
                authCtx.user.list.includes(movieId.toString()) &&
                addedToList === "REMOVE" ? (
                  <BsPlusCircle
                    className={`${classes.icon} ${classes.addIcon}`}
                    onClick={addMovieToList}
                  />
                ) : (authCtx.isLoggedIn &&
                    authCtx.user.list.includes(movieId.toString())) ||
                  addedToList === "ADD" ? (
                  <IoCheckmarkCircleOutline
                    style={{ transform: "scale(1.06)" }}
                    className={`${classes.icon}`}
                    onClick={addMovieToList}
                  />
                ) : (
                  <BsPlusCircle
                    className={`${classes.icon} ${classes.addIcon}`}
                    onClick={addMovieToList}
                  />
                )}
                <Recommend className={classes.icon} />
              </div>
            </div>
            <div className={classes.content}>
              <div className={classes.movieInfo}>
                <div className={classes.rating_year}>
                  <p className={classes.rating}>
                    {movie.vote_average.toFixed(1)}
                    <Star className={classes.starIcons} />
                  </p>
                  <p className={classes.year}>
                    {releaseDate && releaseDate.split("").splice(0, 4)}
                  </p>
                </div>
                <div className={classes.genres}>
                  <p>Genres:</p>

                  {movie.genres.map((genre, index) => (
                    <p key={index}>
                      {genre.name}
                      {index !== movie.genres.length - 1 && ", "}
                    </p>
                  ))}
                </div>
              </div>
              <div className={classes.description}>
                <h2>{movie.name || movie.title}</h2>
                <p>{movie.overview}</p>
              </div>
            </div>
            {data.similarMovies.length > 0 && (
              <div className={classes.similarMovies}>
                <hr className={classes.similarMovieBreakLine} />
                <h2>More Like This</h2>
                <ul className={classes.similarMoviesList}>
                  {data.similarMovies.map((movie) => (
                    <SimilarMovieItem key={movie.id} movie={movie} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Zoom>
      </Modal>
    );
};

export default MovieModal;
