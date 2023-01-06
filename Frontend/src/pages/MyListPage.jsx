//// Packages
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
//// Components
import Nav from "../components/Layouts/Nav";
import MobileMovieModal from "../components/Movies/MobileMovieModal";
import MovieModal from "../components/Movies/MovieModal";
import MyList from "../components/Movies/MyList";
import Footer from "../components/Layouts/Footer";
//// Style
import classes from "../style/pages/MyListPage.module.scss";

const MyListPage = () => {
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
        <Nav position={"static"} />
        <MyList onClickMovie={clickMovieHandler} />
        <Footer />
      </main>
    </>
  );
};

export default MyListPage;
