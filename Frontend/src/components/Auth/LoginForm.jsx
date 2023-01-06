//// Packages
import { Link } from "react-router-dom";

//// Style
import classes from "../../style/Auth/LoginForm.module.scss";

//// Shared
import useInput from "../../shared/hooks/useInput";

const LoginForm = ({ onSignIn }) => {
  const email = useInput((value) =>
    value.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  );
  const password = useInput((value) => value.length > 6 && value.length < 60);
  const formIsValid = email.isValid && password.isValid;

  const submitHandler = () => {
    email.blurHandler();
    password.blurHandler();
    if (!formIsValid) return;
    onSignIn({ email: email.value, password: password.value });
  };

  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <h1>Sign In</h1>
        <div>
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
        <div>
          <input
            value={password.value}
            type="password"
            onChange={({ target }) => password.changeHandler(target.value)}
            onBlur={password.blurHandler}
            className={password.hasError ? classes.unValid : ""}
          />
          <label htmlFor="password">Password</label>
          {password.hasError && (
            <p className={classes.errorMsg}>
              Your password must contain between 6 and 60 characters.
            </p>
          )}
        </div>
        <button type="button" onClick={submitHandler}>
          Sign In
        </button>
        <p className={classes.signUpLink}>
          New to Netflix? <Link to="/">Sign up now</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
