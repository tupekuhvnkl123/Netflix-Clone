//// Packages
import { useQuery } from "react-query";
import { Skeleton } from "@mui/material";
//// Components
import MovieItem from "./MovieItem";
//// Style
import classes from "../../style/Movies/SearchList.module.scss";
//// Shared
import { getMyList, searchMovie } from "../../shared/constants/api";

const SearchList = ({ onClickMovie, searchQuery }) => {
  const { data, isLoading, isSuccess } = useQuery(
    `search-${searchQuery}`,
    () => searchMovie(searchQuery),
    {
      staleTime: Infinity,
    }
  );

  const skeletons = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ];
  if (isLoading) {
    return (
      <div className={classes.listContainer}>
        <header className={classes.header}>
          <h1>My List</h1>
        </header>
        <ul className={classes.loadingCategorieList}>
          {skeletons.map((num) => (
            <div key={num}>
              <Skeleton
                className={classes.skeletonItem}
                style={{ marginRight: "1rem" }}
              />
            </div>
          ))}
        </ul>
      </div>
    );
  }
  if (isSuccess) {
    return (
      <div className={classes.listContainer}>
        <ul className={classes.moviesList}>
          {data.movies.length === 0 ? (
            <div className={classes.emptyList}>
              <p>{`You search for "${searchQuery}" did not have any matches.`}</p>
            </div>
          ) : (
            data.movies.map((movie, index) => (
              <MovieItem
                index={index}
                onClickMovie={() => onClickMovie(movie.id)}
                movie={movie}
                key={movie.id}
                vertical={false}
                className={classes.movieItem}
                containerClassName={classes.movieItemContainer}
              />
            ))
          )}
        </ul>
      </div>
    );
  }
};

export default SearchList;
