//// Packages
import { useNavigate } from "react-router-dom";

//// Components
import NetflixLogo from "../components/UI/NetflixLogo";

//// Style
import classes from "../style/pages/NotFound.module.scss";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <NetflixLogo className={classes.logo} />
      </header>
      <section>
        <h1>Lost your way?</h1>
        <h2>
          Sorry, we can't find that page. You'll find lost to explore on the
          home page.
        </h2>
        <button onClick={() => navigate("/")}>Netflix Home</button>
        <h2 className={classes.errorCode}>
          Error code <b>NSES-404</b>
        </h2>
      </section>
      <div className={classes.movieCredit}>
        <p>
          FROM <b>LOST IN SPACE</b>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
