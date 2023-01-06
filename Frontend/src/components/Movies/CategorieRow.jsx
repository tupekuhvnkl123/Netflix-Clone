//// Packages
import { useRef } from "react";
import { useQuery } from "react-query";
import Skeleton from "@mui/material/Skeleton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

//// Components
import MovieItem from "./MovieItem";

//// Style
import classes from "../../style/Movies/CategorieRow.module.scss";

const CategorieRow = ({ title, fetchFunction, onClickMovie }) => {
  const listRef = useRef(null);

  const { data, isLoading, isSuccess } = useQuery(title, fetchFunction, {
    staleTime: Infinity,
  });

  const scrollRightHandler = () => {
    let movieWidth;
    if (window.innerWidth > 1040) {
      movieWidth = 296;
    } else if (window.innerWidth < 1040 && window.innerWidth > 700) {
      movieWidth = 164.5;
    } else {
      movieWidth = 100;
    }

    if (title === "Netflix Original") {
      listRef.current.scrollLeft += movieWidth * 2;
    } else {
      listRef.current.scrollLeft += movieWidth * 3;
    }
  };
  const scrollLeftHandler = () => {
    const movieWidth = 296;

    if (title === "Netflix Original") {
      listRef.current.scrollLeft -= movieWidth * 2;
    } else {
      listRef.current.scrollLeft -= movieWidth * 3;
    }
  };

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  if (isLoading) {
    return (
      <div className={classes.raw}>
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
      <div className={classes.row}>
        <h2 className={classes.categorieTitle}>{title}</h2>
        <div className={classes.listContainer}>
          <div
            onClick={scrollLeftHandler}
            className={`${classes.arrowContainer} ${classes.leftArrow}`}
          >
            <ArrowBackIosIcon className={classes.arrows} />
          </div>
          {/* <div className={classes.listScroller}> */}
          <ul ref={listRef} className={classes.categorieList}>
            {data.movies.map((movie, index) => (
              <MovieItem
                index={index}
                onClickMovie={() => onClickMovie(movie.id)}
                movie={movie}
                key={movie.id}
                vertical={title === "Netflix Original" ? true : false}
              />
            ))}
          </ul>
          {/* </div> */}

          <div
            onClick={scrollRightHandler}
            className={`${classes.arrowContainer} ${classes.rightArrow}`}
          >
            <ArrowForwardIosIcon className={classes.arrows} />
          </div>
        </div>
      </div>
    );
  }
  return <div></div>;
};

export default CategorieRow;
