//// Components
import CategorieRow from "./CategorieRow";
//// Style
import classes from "../../style/Movies/CategorieRowList.module.scss";
//// Shared
import {
  getTrending,
  getNetflixOriginal,
  getAction,
  getComedy,
  getDocumentaries,
  getHorror,
  getRomance,
  getTopRated,
} from "../../shared/constants/api";

const CategorieRowList = ({ onClickMovie }) => {
  const categories = [
    { title: "Trending", fetchFunction: getTrending },
    { title: "Netflix Original", fetchFunction: getNetflixOriginal },
    { title: "Action", fetchFunction: getAction },
    { title: "Comedy", fetchFunction: getComedy },
    { title: "Documentaries", fetchFunction: getDocumentaries },
    { title: "Horror", fetchFunction: getHorror },
    { title: "Romance", fetchFunction: getRomance },
    { title: "Top Rated", fetchFunction: getTopRated },
  ];

  return (
    <div className={classes.container}>
      <ul className={classes.categoriesList}>
        {categories.map(({ title, fetchFunction }) => (
          <CategorieRow
            onClickMovie={onClickMovie}
            key={title}
            title={title}
            fetchFunction={fetchFunction}
          />
        ))}
      </ul>
    </div>
  );
};

export default CategorieRowList;
