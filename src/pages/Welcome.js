import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import classes from "./Welcome.module.css";
const Welcome = () => {
  const history = useHistory();

  const profileUpdateHandler = () => {
    history.push("/updateprofile");
  };

  const verifyEmailHandler = () => {
    const token = localStorage.getItem("token");

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDP4-5eO8p52VEZaVMnklFgy7vKxZ_EzPg",
        {
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        alert("Login your account before veryfying.");

        console.log(err.code);
      });
  };
  return (
    <div className={classes.welcome}>
      <h1>Welcome to Expense Tracker</h1>
      <h3>
        Your profile is incomplete.{" "}
        <span onClick={profileUpdateHandler}>Complete Now.</span>
      </h3>
      <button onClick={verifyEmailHandler} className={classes.verifybutton}>
        Verify your Email
      </button>
    </div>
  );
};

export default Welcome;
