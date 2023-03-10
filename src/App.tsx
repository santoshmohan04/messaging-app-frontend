import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

interface IProps {}

let App: React.FC<IProps> = () => {
  const [msgs, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    let userData: any = localStorage.getItem("chat_data");
    let state_data = JSON.parse(userData);
    if (state_data) {
      const expirationDuration =
        new Date(state_data.user.stsTokenManager.expirationTime).getTime() -
        new Date().getTime();
      autoLogout(expirationDuration);
      dispatch(state_data);
      setMessages(state_data.messages);
    }
  }, []);

  const autoLogout = (expirationDuration: number) => {
    setTimeout(() => {
      localStorage.clear();
    }, expirationDuration);
  };

  useEffect(() => {
    const pusher = new Pusher("894b768214bb3e496101", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (data: never) => {
      setMessages([...msgs, data]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [msgs]);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar messages={msgs} />
          <Chat messages={msgs} />
        </div>
      )}
    </div>
  );
};

export default App;
