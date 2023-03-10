import React from "react";
import { Button } from "@material-ui/core";
import "./Login.css";
import { auth, provider, signInWithPopup } from "./firebase";
import { actionTypes } from "./reducer";
import axios from "./axios";
import { useStateValue } from "./StateProvider";

interface IProps {}

let Login: React.FC<IProps> = () => {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result: any) => {
        axios.get("/messages/sync").then((res) => {
          dispatch({
            type: actionTypes.SET_USER,
            user: result.user,
            messages: res.data,
          });
          localStorage.setItem(
            "chat_data",
            JSON.stringify({
              type: actionTypes.SET_USER,
              user: result.user,
              messages: res.data,
            })
          );
        });
      })
      .catch((error: any) => alert(error.message));
  };

  return (
    <React.Fragment>
      <div className="login">
        <div className="login__container">
          <img src="logo512.png" alt="whatsapp" />
          <div className="login__text">
            <h1>Sign in to Messaging App</h1>
          </div>
          <Button onClick={signIn}>Sign In with Google</Button>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Login;
