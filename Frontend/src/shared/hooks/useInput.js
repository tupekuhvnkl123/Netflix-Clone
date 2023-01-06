//// Packages
import { useState } from "react";

const useInput = (validateValue, initialValue) => {
  const [value, setValue] = useState(initialValue ? initialValue : "");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateValue(value);
  const hasError = !isValid && isTouched;

  const changeHandler = (e) => {
    if (!e.target) {
      setValue(e);
    } else {
      setValue(e.target.value);
    }
  };

  const focusHandler = (e) => {
    setIsTouched(false);
  };

  const blurHandler = (e) => {
    setIsTouched(true);
  };

  const input = {
    value,
    isValid,
    hasError,
    changeHandler,
    blurHandler,
    focusHandler,
  };

  return input;
};

export default useInput;
