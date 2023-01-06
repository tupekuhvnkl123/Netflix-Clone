//// Packages
import { useContext, useState } from "react";
import { useMutation } from "react-query";
import { Star, Recommend, PlayCircleFilledOutlined } from "@mui/icons-material";
import { TfiArrowCircleDown } from "react-icons/tfi";
import { BsPlusCircle } from "react-icons/bs";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
//// Style
import classes from "../../style/Movies/MovieItem.module.scss";
//// Shared
import { getMovieGenres } from "../../shared/constants/api";
import { AuthContext } from "../../shared/context/auth-context";
import useAddToList from "../../shared/hooks/useAddToList";

const MovieItem = ({
  movie,
  vertical,
  onClickMovie,
  index,
  className,
  containerClassName,
}) => {
  const authCtx = useContext(AuthContext);
  const [increaseMovie, setIncreaseMovie] = useState(false);

  const querySettings = {
    staleTime: Infinity,
    retry: false,
  };

  const getGenres = useMutation(
    `genres-${movie.id}`,
    () => getMovieGenres(movie.id),
    querySettings
  );

  const { addMovieToList, result: addedToList } = useAddToList(movie.id);

  let fetchGenres;
  const movieHoverHandler = () => {
    fetchGenres = setTimeout(() => {
      setIncreaseMovie(true);
      getGenres.mutate();
    }, 500);
  };

  const movieUnHoverHandler = () => {
    setIncreaseMovie(false);
    clearTimeout(fetchGenres);
  };

  const movieImage =
    vertical || window.innerWidth <= 600
      ? movie.poster_path
      : movie.backdrop_path
      ? movie.backdrop_path
      : movie.poster_path;

  return (
    <div
      className={`${classes.container} ${vertical ? classes.vertical : ""} ${
        containerClassName ? containerClassName : ""
      }`}
    >
      <li
        // onClick={onClickMovie}
        onMouseEnter={movieHoverHandler}
        onMouseLeave={movieUnHoverHandler}
        className={`${classes.movieItem} ${
          increaseMovie ? classes.increase : ""
        } ${vertical ? classes.vertical : ""} ${
          index === 0 ? classes.firstMovie : ""
        } ${className ? className : ""}`}
      >
        <img
          src={`https://image.tmdb.org/t/p/original/${movieImage}`}
          alt={movie.name}
          onClick={onClickMovie}
        />
        <div className={classes.content}>
          <div className={classes.buttons}>
            <div>
              <PlayCircleFilledOutlined className={classes.icon} />
              {authCtx.isLoggedIn &&
              authCtx.user.list.includes(movie.id.toString()) &&
              addedToList === "REMOVE" ? (
                <BsPlusCircle
                  className={`${classes.icon} ${classes.reactIcons}`}
                  onClick={addMovieToList}
                />
              ) : (authCtx.isLoggedIn &&
                  authCtx.user.list.includes(movie.id.toString())) ||
                addedToList === "ADD" ? (
                <IoCheckmarkCircleOutline
                  style={{ transform: "scale(1.06)" }}
                  className={`${classes.icon}`}
                  onClick={addMovieToList}
                />
              ) : (
                <BsPlusCircle
                  className={`${classes.icon} ${classes.reactIcons}`}
                  onClick={addMovieToList}
                />
              )}

              <Recommend className={classes.icon} />
            </div>
            <TfiArrowCircleDown
              onClick={onClickMovie}
              className={`${classes.icon} ${classes.reactIcons}`}
            />
          </div>
          {movie.vote_average && (
            <p onClick={onClickMovie} className={classes.rating}>
              {movie.vote_average.toFixed(1)}
              <Star className={classes.starIcons} />
            </p>
          )}

          {getGenres.isSuccess && (
            <div onClick={onClickMovie} className={classes.genres}>
              {getGenres.data.genres.map((genre) => (
                <p key={genre.id}>{genre.name}</p>
              ))}
            </div>
          )}
        </div>
      </li>
    </div>
  );
};

export default MovieItem;
