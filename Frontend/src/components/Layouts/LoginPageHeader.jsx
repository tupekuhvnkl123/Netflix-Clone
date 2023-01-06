//// Components
import NetflixLogo from "../UI/NetflixLogo";

//// Style
import classes from "../../style/Layouts/LoginPageHeader.module.scss";

const LoginPageHeader = () => {
  return (
    <header className={classes.header}>
      <NetflixLogo className={classes.logo} />
    </header>
  );
};

export default LoginPageHeader;
