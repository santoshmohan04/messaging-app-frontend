import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";

interface IProps {
  messages: Array<any>;
}

let SidebarChat: React.FC<IProps> = ({ messages }) => {
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <React.Fragment>
      <div className="sidebarChat">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/
              b${seed}.svg`}
        />
        <div className="sidebarChat__info">
          <h2>Dev Help</h2>
          <p>{messages[messages?.length - 1]?.message}</p>
        </div>
      </div>
    </React.Fragment>
  );
};
export default SidebarChat;
