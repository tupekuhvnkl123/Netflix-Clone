//// Packages
import { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

//// Components
import LandingPageHeader from "../components/Layouts/LandingPageHeader";
import Footer from "../components/Layouts/Footer";
import RegisterEmailForm from "../components/Auth/RegisterEmailForm";
import CompleteRegisterForm from "../components/Auth/CompleteRegisterForm";

//// Style
import classes from "../style/pages/LandingPage.module.scss";

//// Shared
import { register, errorMessage } from "../shared/constants/api";
import { AuthContext } from "../shared/context/auth-context";

const LandingPage = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [showCompleteForm, setShowCompleteForm] = useState(false);
  const [email, setEmail] = useState("");

  const signUpMutation = useMutation((data) => register(data), {
    staleTime: Infinity,
    retry: false,
  });

  const completeRegister = (email) => {
    setEmail(email);
    setShowCompleteForm(true);
  };

  const resErrorMessage = errorMessage(
    signUpMutation.error,
    "Sign up failed, please try again."
  );

  const signUpHandler = (data) => {
    signUpMutation.mutateAsync(data).then(() => {
      navigate("/login");
    });
  };

  useEffect(() => {
    if (authCtx.isLoggedIn) navigate("/browse");
  }, [authCtx.isLoggedIn]);

  return (
    <>
      <div className={classes.container}>
        <LandingPageHeader />
        {!showCompleteForm && (
          <RegisterEmailForm completeRegister={completeRegister} />
        )}
        {showCompleteForm && (
          <CompleteRegisterForm
            initialEmail={email}
            onSignUp={signUpHandler}
            errorMessage={resErrorMessage}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
