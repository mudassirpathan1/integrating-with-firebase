import axios from "axios";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import classes from "./ForgotPassword.module.css";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const emailInputRef = useRef();
  const history = useHistory();
  
  const goToLoginPage = () => {
    history.replace("/login");
  };
  
  const resetPasswordHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = emailInputRef.current.value;
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDP4-5eO8p52VEZaVMnklFgy7vKxZ_EzPg",
        {
          requestType: "PASSWORD_RESET",
          email: email,
        }
      )
      .then((res) => {
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.message);
      });
  };
  return (
    <div className={classes.outerbox}>
      <form onSubmit={resetPasswordHandler} className={classes.resetform}>
        <p>Enter the email with which you have registered.</p>
        <input type="email" placeholder="Email address" ref={emailInputRef} />
        <button>Send Link</button>
        {isLoading && <p>Loading...</p>}
        <p>
          Already a user?<span onClick={goToLoginPage}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
