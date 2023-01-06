//// Packages
import { useContext } from "react";
import { ClickAwayListener, Fade } from "@mui/material";
import { BiUser } from "react-icons/bi";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

//// Styles
import classes from "../../style/Layouts/UserMenu.module.scss";

//// Shared
import { AuthContext } from "../../shared/context/auth-context";

const UserMenu = ({ show, closeMenu }) => {
  const authCtx = useContext(AuthContext);

  const logoutHandler = async () => {
    authCtx.logout();
  };

  return (
    <Fade style={{ transitionDuration: "0.1s" }} in={show}>
      <div onMouseLeave={closeMenu} className={classes.userMenuCard}>
        <ClickAwayListener onClickAway={closeMenu}>
          <div>
            <div className={classes.userAvatar}>
              <img src="../Avatar.png" alt="Avatar" />
              <p>
                {authCtx.user && authCtx.user.name ? authCtx.user.name : "name"}
              </p>
            </div>
            <div className={classes.navItems}>
              <Link to="/YourAccount">
                <div className={classes.navItem}>
                  <BiUser className={classes.icon} />
                  <p>Account</p>
                </div>
              </Link>
              <div className={classes.navItem}>
                <IoMdHelpCircleOutline className={classes.icon} />
                <a href="https://help.netflix.com/en/" target="_blank">
                  Help Center
                </a>
              </div>
            </div>
            <hr className={classes.signoutBreakLine} />
            <div className={classes.signout}>
              <button onClick={logoutHandler}>Sign out of Netflix</button>
            </div>
          </div>
        </ClickAwayListener>
      </div>
    </Fade>
  );
};

export default UserMenu;
