import React, { useEffect, useState } from "react";
import { Avatar, IconButton, Button } from "@material-ui/core";
import axios from "./axios";
import {
  AttachFile,
  MoreVert,
  SearchOutlined,
  InsertEmoticon,
} from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import SendIcon from "@material-ui/icons/Send";
import "./Chat.css";
import { useStateValue } from "./StateProvider";

interface IProps {
  messages: Array<any>;
}

let Chat: React.FC<IProps> = ({ messages }) => {
  const [seed, setSeed] = useState(0);
  const [input, setInput] = useState("");
  const [{ user }, dispatch] = useStateValue();

  const sendMessage = async (e: any) => {
    e.preventDefault();
    await axios.post("/messages/new", {
      message: input,
      name: user.displayName,
      timestamp: new Date().toUTCString(),
      received: true,
    });
    setInput("");
  };

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <React.Fragment>
      <div className="chat">
        <div className="chat__header">
          <Avatar
            src={`https://avatars.dicebear.com/api/human/
                b${seed}.svg`}
          />
          <div className="chat__headerInfo">
            <h3>Dev Help</h3>
            <p>Last seen at {messages[messages.length - 1]?.timestamp}</p>
          </div>
          <div className="chat__headerRight">
            <IconButton>
              <SearchOutlined />
            </IconButton>
            <IconButton>
              <AttachFile />
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
        </div>
        <div className="chat__body">
          {messages.map((message: any) => (
            <p
              key={message._id}
              className={`chat__message ${
                message.name === user.displayName && "chat__receiver"
              }`}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">{message.timestamp}</span>{" "}
            </p>
          ))}
        </div>
        <div className="chat__footer">
          <InsertEmoticon />
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
              type="text"
            />
            {/* <Button variant="contained" onClick={sendMessage} type="submit">
              Send a message
            </Button> */}
            <IconButton onClick={sendMessage} type="submit">
              <SendIcon />
            </IconButton>
            {/* <button onClick={sendMessage} type="submit">
              Send a message
            </button> */}
          </form>
          <MicIcon />
        </div>
      </div>
    </React.Fragment>
  );
};
export default Chat;
