//// Packages
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
//// Components
import Nav from "../components/Layouts/Nav";
import MobileMovieModal from "../components/Movies/MobileMovieModal";
import MovieModal from "../components/Movies/MovieModal";
import SearchList from "../components/Movies/SearchList";
import Footer from "../components/Layouts/Footer";
//// Style
import classes from "../style/pages/MyListPage.module.scss";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMovieModal, setShowMovieModal] = useState(null);
  const clickMovieHandler = (movieId) => {
    setShowMovieModal(movieId);
  };

  const searchQuery = location.search.split("=")[1];
  useEffect(() => {
    if (!searchQuery || !searchQuery.trim().length) {
      navigate("/browse");
    }
    const storedUser = Cookies.get("user");
    if (!storedUser) navigate("/login");
  }, []);

  const mobileScreen = window.innerWidth <= 600;

  return (
    <>
      {showMovieModal && !mobileScreen && (
        <MovieModal
          movieId={showMovieModal}
          show={showMovieModal}
          onClose={() => setShowMovieModal(null)}
        />
      )}
      {showMovieModal && mobileScreen && (
        <MobileMovieModal
          movieId={showMovieModal}
          show={showMovieModal}
          onClose={() => setShowMovieModal(null)}
        />
      )}
      <main className={classes.main}>
        <Nav position={"static"} />
        <SearchList
          onClickMovie={clickMovieHandler}
          searchQuery={searchQuery}
        />
        <Footer />
      </main>
    </>
  );
};

export default SearchPage;
