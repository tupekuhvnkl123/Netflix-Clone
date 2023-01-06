//// Style
import classes from "../../style/Auth/CompleteRegisterForm.module.scss";

//// Shared
import useInput from "../../shared/hooks/useInput";

const CompleteRegisterForm = ({ initialEmail, onSignUp }) => {
  const name = useInput((value) => value.length > 0);

  const email = useInput(
    (value) =>
      value.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    initialEmail
  );
  const password = useInput((value) => value.length > 6 && value.length < 60);

  const formIsValid = name.isValid && email.isValid && password.isValid;

  const submitHandler = () => {
    name.blurHandler();
    email.blurHandler();
    password.blurHandler();
    if (!formIsValid) return;
    // console.log({
    //   name: name.value,
    //   email: email.value,
    //   password: password.value,
    // });
    onSignUp({
      name: name.value,
      email: email.value,
      password: password.value,
    });
  };

  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <h1>Sign Up</h1>
        <div>
          <input
            value={name.value}
            type="text"
            onChange={({ target }) => name.changeHandler(target.value)}
            onBlur={name.blurHandler}
            className={name.hasError ? classes.unValid : ""}
          />
          <label htmlFor="name">Name</label>
          {name.hasError && (
            <p className={classes.errorMsg}>Name is required.</p>
          )}
        </div>
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
          <label htmlFor="password">Add Password</label>
          {password.hasError && (
            <p className={classes.errorMsg}>
              Your password must contain between 6 and 60 characters.
            </p>
          )}
        </div>
        <button type="button" onClick={submitHandler}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default CompleteRegisterForm;
