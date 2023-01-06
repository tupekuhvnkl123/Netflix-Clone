//// Packages
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiArrowDropDownFill } from "react-icons/ri";
import { HiOutlineSearch } from "react-icons/hi";
import { ClickAwayListener } from "@mui/base";
//// Components
import NetflixLogo from "../UI/NetflixLogo";
//// Style
import classes from "../../style/Layouts/Nav.module.scss";
import UserMenu from "./UserMenu";

const Nav = ({ position }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  const linksClasses = (path) => {
    if (location.pathname === path) return classes.active;
    else return "";
  };

  const searchIconHandler = () => {
    setShowSearchBar(true);
  };
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (!searchValue.trim().length) return;
    navigate(`/search?q=${searchValue}`);
  };

  return (
    <nav
      className={`${classes.nav} ${showNav ? classes.blackNav : ""} ${
        position === "static" ? classes.staticPosition : ""
      }`}
    >
      <div className={classes.links_logo}>
        <NetflixLogo className={classes.logo} />
        <NetflixLogo className={classes.mobileLogo} letter={true} />
        <Link to={"/browse"} className={linksClasses("/browse")}>
          Home
        </Link>
        <Link
          to={"/browse/my-list"}
          className={linksClasses("/browse/my-list")}
        >
          My List
        </Link>
      </div>
      <div className={classes.avatar_search}>
        <ClickAwayListener onClickAway={() => setShowSearchBar(false)}>
          <form
            className={`${classes.searchForm} ${
              showSearchBar ? classes.show : ""
            }`}
            onSubmit={searchSubmitHandler}
          >
            <button type="button" onClick={searchIconHandler}>
              <HiOutlineSearch className={classes.icon} />
            </button>
            <input
              placeholder="Titles, people, genres"
              value={searchValue}
              type="text"
              onChange={({ target }) => setSearchValue(target.value)}
            />
          </form>
        </ClickAwayListener>
        <div
          onMouseEnter={() => setShowUserMenu(true)}
          className={classes.avatarContainer}
        >
          <img
            src="../Avatar.png"
            alt="Avatar"
            className={classes.avatar}
            onClick={() => setShowUserMenu((p) => !p)}
          />
          <RiArrowDropDownFill
            className={classes.arrowDown}
            onClick={() => setShowUserMenu((p) => !p)}
          />
          {showUserMenu && (
            <UserMenu
              closeMenu={() => setShowUserMenu(false)}
              show={showUserMenu}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
