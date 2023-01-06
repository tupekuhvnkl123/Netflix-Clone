//// Packages
import { Star } from "@mui/icons-material";
import { useContext, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
//// Style
import classes from "../../style/Movies/SimilarMovieItem.module.scss";
//// Shared
import useAddToList from "../../shared/hooks/useAddToList";
import { AuthContext } from "../../shared/context/auth-context";

const SimilarMovieItem = ({ movie }) => {
  const authCtx = useContext(AuthContext);

  const [showOverview, setShowOverview] = useState(false);
  let releaseDate = movie.release_date || movie.first_air_date;

  const { addMovieToList, result: addedToList } = useAddToList(movie.id);

  return (
    <li className={classes.similarMovie}>
      <img
        src={`https://image.tmdb.org/t/p/original/${
          movie.backdrop_path || movie.poster_path
        }`}
        alt={movie.name}
      />
      <div className={classes.year_addToList}>
        <div>
          <p className={classes.rating}>
            {movie.vote_average.toFixed(1)}
            <Star className={classes.starIcons} />
          </p>
          <p>{releaseDate.split("").splice(0, 4)}</p>
        </div>
        {authCtx.isLoggedIn &&
        authCtx.user.list.includes(movie.id.toString()) &&
        addedToList === "REMOVE" ? (
          <BsPlusCircle
            className={classes.addToListIcon}
            onClick={addMovieToList}
          />
        ) : (authCtx.isLoggedIn &&
            authCtx.user.list.includes(movie.id.toString())) ||
          addedToList === "ADD" ? (
          <IoCheckmarkCircleOutline
            style={{ transform: "scale(1.2)" }}
            className={classes.addToListIcon}
            onClick={addMovieToList}
          />
        ) : (
          <BsPlusCircle
            className={classes.addToListIcon}
            onClick={addMovieToList}
          />
        )}
      </div>
      <p
        onClick={() => setShowOverview((prev) => !prev)}
        className={`${classes.overview} ${showOverview ? classes.show : ""}`}
      >
        {movie.overview}
      </p>
    </li>
  );
};

export default SimilarMovieItem;
