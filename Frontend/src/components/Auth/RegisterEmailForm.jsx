//// Packages
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

//// Style
import classes from "../../style/Auth/RegisterEmailForm.module.scss";

//// Shared
import useInput from "../../shared/hooks/useInput";

const RegisterEmailForm = ({ completeRegister }) => {
  const email = useInput((value) =>
    value.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  );

  const formIsValid = email.isValid;

  const submitHandler = () => {
    email.blurHandler();
    if (!formIsValid) return;
    completeRegister(email.value);
  };

  return (
    <div className={classes.container}>
      <h1>Unlimited movies, TV shows, and more.</h1>
      <h2>Watch anywhere. Cancel anytime.</h2>
      <h3>
        Ready to watch? Enter your email to create or restart your membership.
      </h3>

      <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
        <div style={{ position: "relative", height: "100%" }}>
          <input
            value={email.value}
            type="email"
            onChange={({ target }) => email.changeHandler(target.value)}
            onBlur={email.blurHandler}
            className={email.hasError ? classes.unValid : ""}
          />
          <label htmlFor="email">Email</label>
          {email.hasError && (
            <p className={classes.errorMsg}>Please enter a valid email</p>
          )}
        </div>
        <button type="button" onClick={submitHandler}>
          Get Started
          <ArrowForwardIosIcon className={classes.arrowIcon} />
        </button>
      </form>
    </div>
  );
};

export default RegisterEmailForm;
