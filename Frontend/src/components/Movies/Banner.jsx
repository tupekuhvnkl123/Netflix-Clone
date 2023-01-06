//// Packages
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { IoMdCheckmark } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
//// Style
import classes from "../../style/Movies/Banner.module.scss";
//// Shared
import { getMovieGenres, getNetflixOriginal } from "../../shared/constants/api";
import { useContext, useEffect, useState } from "react";
import useAddToList from "../../shared/hooks/useAddToList";
import { AuthContext } from "../../shared/context/auth-context";

const Banner = ({ onClickInfo }) => {
  const authCtx = useContext(AuthContext);
  const [movie, setMovie] = useState({});

  const { data, isLoading, isSuccess } = useQuery(
    "getNetflixOrgins",
    getNetflixOriginal,
    { staleTime: Infinity }
  );
  const getGenres = useQuery(
    movie && movie.id ? `genres-${movie.id}` : "getGenres",
    () => getMovieGenres(movie && movie.id ? movie.id : null),
    { staleTime: Infinity, enabled: movie && !!movie.id }
  );

  const { addMovieToList, result: addedToList } = useAddToList(
    movie && movie.id
  );

  useEffect(() => {
    if (data) {
      const randomMovieNumber = Math.floor(
        Math.random() * data.movies.length - 1
      );
      setMovie(data.movies[randomMovieNumber]);
      console.log(data.movies);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress className={classes.loadingSpinner} />
      </div>
    );
  }

  const movieImage =
    movie &&
    (window.innerWidth <= 600
      ? movie.poster_path || movie.backdrop_path
      : movie.backdrop_path || movie.poster_path);

  if (isSuccess) {
    return (
      <header
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0,0), rgba(20, 20, 20, 0) , rgba(20, 20, 20, 0.7) , rgba(20, 20, 20 , 1)), url("https://image.tmdb.org/t/p/original/${movieImage}")`,
        }}
        className={classes.banner}
      >
        <div className={classes.content}>
          <h1>{movie && movie.name}</h1>
          <p className={classes.overview}>{movie && movie.overview}</p>
          {getGenres.isSuccess && (
            <div className={classes.genres}>
              {getGenres.data.genres.map((genre) => (
                <p key={genre.id}>{genre.name}</p>
              ))}
            </div>
          )}
          <div className={classes.buttons}>
            <button className={classes.listButton}>
              {authCtx.isLoggedIn &&
              authCtx.user.list.includes(
                movie && movie.id && movie.id.toString()
              ) &&
              addedToList === "REMOVE" ? (
                <FiPlus className={classes.icon} onClick={addMovieToList} />
              ) : (authCtx.isLoggedIn &&
                  authCtx.user.list.includes(
                    movie && movie.id && movie.id.toString()
                  )) ||
                addedToList === "ADD" ? (
                <IoMdCheckmark
                  className={classes.icon}
                  onClick={addMovieToList}
                />
              ) : (
                <FiPlus className={classes.icon} onClick={addMovieToList} />
              )}
              My List
            </button>
            <button className={classes.playButton}>
              <PlayArrowIcon className={classes.icon} />
              Play
            </button>
            <button
              className={classes.infoButton}
              onClick={() => onClickInfo(movie.id)}
            >
              <InfoOutlinedIcon className={classes.icon} />

              <p className={classes.smallScreenText}>Info</p>
              <p className={classes.bigScreenText}>More Info</p>
            </button>
          </div>
        </div>
      </header>
    );
  }
  return <div></div>;
};

export default Banner;
