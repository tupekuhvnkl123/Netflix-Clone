//// Packages
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
//// Components
import Nav from "../components/Layouts/Nav";
import Banner from "../components/Movies/Banner";
import CategorieRowList from "../components/Movies/CategorieRowList";
import Footer from "../components/Layouts/Footer";
import MovieModal from "../components/Movies/MovieModal";
import MobileMovieModal from "../components/Movies/MobileMovieModal";
//// Style
import classes from "../style/pages/BrowsePage.module.scss";

const BrowsePage = () => {
  const navigate = useNavigate();
  const [showMovieModal, setShowMovieModal] = useState(null);
  const clickMovieHandler = (movieId) => {
    setShowMovieModal(movieId);
  };

  useEffect(() => {
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
        <Nav />
        <Banner onClickInfo={clickMovieHandler} />
        <CategorieRowList onClickMovie={clickMovieHandler} />
        <Footer className={classes.footer} />
      </main>
    </>
  );
};

export default BrowsePage;
