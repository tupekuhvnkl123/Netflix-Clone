//// Packages
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
//// Components
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import BrowsePage from "./pages/BrowsePage";
import MyListPage from "./pages/MyListPage";
import SearchPage from "./pages/SearchPage";
import AccountPage from "./pages/AccountPage";
//// Shared
import { AuthContext } from "./shared/context/auth-context";
import useAuth from "./shared/hooks/useAuth";

function App() {
  const { isLoggedIn, user, login, logout } = useAuth();

  axios.defaults.baseURL = `${process.env.REACT_APP_API}/api`;
  axios.defaults.withCredentials = true;

  const storedUser = Cookies.get("user");
  if (storedUser) {
    axios.defaults.headers.common["authorization"] =
      JSON.parse(storedUser).accessToken;
  }

  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/browse/my-list" element={<MyListPage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/YourAccount" element={<AccountPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
