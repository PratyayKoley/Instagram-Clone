import React, { useContext } from "react";
import Home from "../../Icons/Home.svg";
import Explore from "../../Icons/Explore.svg";
import Reels from "../../Icons/Reels.svg";
import Create from "../../Icons/Create.svg";
import Messages from "../../Icons/Messages.svg";
import Profile from "../../Icons/Profile.svg";
import HomeLight from "../../Icons (Light Mode)/HomeLight.svg";
import ExploreLight from "../../Icons (Light Mode)/ExploreLight.svg";
import ReelsLight from "../../Icons (Light Mode)/ReelsLight.svg";
import MessagesLight from "../../Icons (Light Mode)/MessagesLight.svg";
import CreateLight from "../../Icons (Light Mode)/CreateLight.svg";
import ProfileLight from "../../Icons (Light Mode)/ProfileLight.svg";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../App";

const FooterResize = () => {
  const DarkModeSetting = useContext(DarkModeContext);
  return (
    <div className="footerResize">
      <div className="footerResizeContainer d-flex justify-content-between align-items-center">
        <Link to="/main">
          <img src={DarkModeSetting.darkMode ? Home : HomeLight} alt="Home" />
        </Link>
        <Link to="/explore">
          <img src={DarkModeSetting.darkMode ? Explore : ExploreLight} alt="Explore" />
        </Link>
        <Link to="/reels">
          <img src={DarkModeSetting.darkMode ? Reels : ReelsLight} alt="Reels" />
        </Link>

        <img src={DarkModeSetting.darkMode ? Create : CreateLight} alt="Create" />

        <Link to="/messagesresized">
          <img src={DarkModeSetting.darkMode ? Messages : MessagesLight} alt="Messages" />
        </Link>

        <Link to="/profileresized">
          <img src={DarkModeSetting.darkMode ? Profile : ProfileLight} alt="Profile" />
        </Link>
      </div>
    </div>
  );
};
export default FooterResize;
