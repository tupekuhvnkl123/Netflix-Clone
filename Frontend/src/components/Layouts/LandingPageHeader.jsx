//// Packages
import { Link } from "react-router-dom";

//// Components
import NetflixLogo from "../UI/NetflixLogo";

//// Style
import classes from "../../style/Layouts/LandingPageHeader.module.scss";

const LandingPageHeader = () => {
  return (
    <header className={classes.header}>
      <NetflixLogo className={classes.logo} />
      <Link className={classes.signInLink} to="/login">
        Sign In
      </Link>
    </header>
  );
};

export default LandingPageHeader;
