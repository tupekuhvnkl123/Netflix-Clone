//// Packages
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
//// Components
import AccountInfo from "../components/Account/AccountInfo";
import Footer from "../components/Layouts/Footer";
import Nav from "../components/Layouts/Nav";
//// Style
import classes from "../style/pages/AccountPage.module.scss";
//// Shared
import { deleteAccount } from "../shared/constants/api";
import { AuthContext } from "../shared/context/auth-context";

const AccountPage = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (!storedUser) navigate("/login");
  }, []);

  const deleteAccountMutation = useMutation(() => deleteAccount(), {
    staleTime: Infinity,
    retry: false,
  });

  const deleteAccountHandler = () => {
    deleteAccountMutation.mutateAsync().then(() => {
      authCtx.logout();
    });
  };

  return (
    <>
      <Nav position={"static"} />
      <AccountInfo onDeleteAccount={deleteAccountHandler} />
      <Footer className={classes.footer} />
    </>
  );
};

export default AccountPage;
