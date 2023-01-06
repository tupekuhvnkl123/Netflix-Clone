//// Packages
import { useMutation } from "react-query";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//// Components
import Footer from "../components/Layouts/Footer";
import LoginForm from "../components/Auth/LoginForm";
import LoginPageHeader from "../components/Layouts/LoginPageHeader";
//// Style
import classes from "../style/pages/LoginPage.module.scss";
//// Shared
import { login } from "../shared/constants/api";
import { AuthContext } from "../shared/context/auth-context";

const LoginPage = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const signInMutation = useMutation((data) => login(data), {
    staleTime: Infinity,
    retry: false,
  });

  const signInHandler = (data) => {
    signInMutation.mutateAsync(data).then((res) => {
      authCtx.login(res);
    });
  };

  useEffect(() => {
    if (authCtx.isLoggedIn) navigate("/browse");
  }, [authCtx.isLoggedIn]);

  return (
    <div className={classes.container}>
      <LoginPageHeader />
      <LoginForm onSignIn={signInHandler} />
      <Footer />
    </div>
  );
};

export default LoginPage;
