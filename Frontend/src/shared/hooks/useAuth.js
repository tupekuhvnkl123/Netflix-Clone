//// Packages
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const useAuth = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const userCookie = Cookies.get("user");

  const login = useCallback((data, endingPath) => {
    setIsLoggedIn(!!data.accessToken);
    setUser(data.userData);
    const storedUser = {
      ...data.userData,
      accessToken: data.accessToken,
      createdAt: Date.now(),
    };
    const inThreeHours = new Date(new Date().getTime() + 3 * 60 * 60 * 1000);
    Cookies.set("user", JSON.stringify(storedUser), {
      expires: inThreeHours,
    });

    navigate(endingPath || "/browse");
  }, []);

  const logout = useCallback((endingPath) => {
    setIsLoggedIn(false);
    setUser(null);
    Cookies.remove("user");
    navigate(endingPath || "/");
  }, []);

  useEffect(() => {
    const storedUser = Cookies.get("user");

    if (storedUser) {
      setIsLoggedIn(!!JSON.parse(storedUser).accessToken);
      setUser(JSON.parse(storedUser));
    }

    if (!storedUser) {
      logout();
    }
  }, []);

  return { isLoggedIn, user, login, logout };
};

export default useAuth;
