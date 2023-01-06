//// Packages
import { useContext, useRef } from "react";
import { Modal, Slide, CircularProgress } from "@mui/material";
import { BsPlusCircle } from "react-icons/bs";
import { useQuery } from "react-query";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import {
  Recommend,
  PlayCircleSharp,
  CancelRounded,
  Star,
  ShareOutlined,
  InfoOutlined,
  ArrowForwardIos,
} from "@mui/icons-material";

//// Style
import classes from "../../style/Movies/MobileMovieModal.module.scss";
//// Shared
import { getMovie } from "../../shared/constants/api";
import { AuthContext } from "../../shared/context/auth-context";
import useAddToList from "../../shared/hooks/useAddToList";

const MobileMovieModal = ({ show, onClose, movieId }) => {
  const authCtx = useContext(AuthContext);
  const containerRef = useRef(null);

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
        <div ref={containerRef} className={classes.animationContainer}>
          <Slide container={containerRef.current} direction="up" in={!!show}>
            <div className={`${classes.container} ${classes.loading}`}>
              <CircularProgress className={classes.loadingSpinner} />
            </div>
          </Slide>
        </div>
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
        <div ref={containerRef} className={classes.animationContainer}>
          <Slide container={containerRef.current} direction="up" in={!!show}>
            <div className={classes.container}>
              <div className={classes.content_image}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${
                    movie.poster_path || movie.backdrop_path
                  }`}
                  alt={movie.name || movie.title}
                />
                <div className={classes.content}>
                  <div className={classes.title}>
                    <h2>{movie.name || movie.title}</h2>
                    <CancelRounded className={classes.icon} onClick={onClose} />
                  </div>
                  <div className={classes.rating_year}>
                    <p className={classes.year}>
                      {releaseDate && releaseDate.split("").splice(0, 4)}
                    </p>
                    <p className={classes.rating}>
                      {movie.vote_average.toFixed(1)}
                      <Star className={classes.starIcons} />
                    </p>
                  </div>
                  <p className={classes.overview}>{movie.overview}</p>
                </div>
              </div>
              <div className={classes.buttons}>
                <button>
                  <PlayCircleSharp className={classes.icon} />
                  Play
                </button>
                <button>
                  {authCtx.isLoggedIn &&
                  authCtx.user.list.includes(movieId.toString()) &&
                  addedToList === "REMOVE" ? (
                    <BsPlusCircle
                      className={classes.icon}
                      onClick={addMovieToList}
                    />
                  ) : (authCtx.isLoggedIn &&
                      authCtx.user.list.includes(movieId.toString())) ||
                    addedToList === "ADD" ? (
                    <IoCheckmarkCircleOutline
                      style={{ transform: "scale(1.2)" }}
                      className={`${classes.icon}`}
                      onClick={addMovieToList}
                    />
                  ) : (
                    <BsPlusCircle
                      className={classes.icon}
                      onClick={addMovieToList}
                    />
                  )}
                  My List
                </button>
                <button>
                  <Recommend className={classes.icon} />
                  Like
                </button>
                <button>
                  <ShareOutlined className={classes.icon} />
                  Share
                </button>
              </div>
              <hr />
              <div className={classes.info}>
                <div>
                  <InfoOutlined />
                  <p>Info</p>
                </div>
                <ArrowForwardIos className={classes.icon} />
              </div>
            </div>
          </Slide>
        </div>
      </Modal>
    );
};

export default MobileMovieModal;
