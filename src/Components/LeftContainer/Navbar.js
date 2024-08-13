import React, { useContext, useState } from "react";
import Home from "../../Icons/Home.svg";
import Search from "../../Icons/Search.svg";
import Explore from "../../Icons/Explore.svg";
import Reels from "../../Icons/Reels.svg";
import Messages from "../../Icons/Messages.svg";
import Notifications from "../../Icons/Notifications.svg";
import Create from "../../Icons/Create.svg";
import Profile from "../../Icons/Profile.svg";
import fillHome from "../../Icons/fillHome.svg";
import fillSearch from "../../Icons/fillSearch.svg";
import fillExplore from "../../Icons/fillExplore.svg";
import fillReels from "../../Icons/fillReels.svg";
import fillNotifications from "../../Icons/fillNotifications.svg";
import fillMessages from "../../Icons/fillMessages.svg";
import fillCreate from "../../Icons/fillCreate.svg";
import fillProfile from "../../Icons/fillProfile.svg";
import Post from "../../Icons/Post.svg";
import Video from "../../Icons/Video.svg";
import HomeLight from "../../Icons (Light Mode)/HomeLight.svg";
import SearchLight from "../../Icons (Light Mode)/SearchLight.svg";
import ExploreLight from "../../Icons (Light Mode)/ExploreLight.svg";
import ReelsLight from "../../Icons (Light Mode)/ReelsLight.svg";
import MessagesLight from "../../Icons (Light Mode)/MessagesLight.svg";
import NotificationsLight from "../../Icons (Light Mode)/NotificationsLight.svg";
import CreateLight from "../../Icons (Light Mode)/CreateLight.svg";
import ProfileLight from "../../Icons (Light Mode)/ProfileLight.svg";
import fillHomeLight from "../../Icons (Light Mode)/fillHomeLight.svg";
import fillSearchLight from "../../Icons (Light Mode)/fillSearchLight.svg";
import fillExploreLight from "../../Icons (Light Mode)/fillExploreLight.svg";
import fillReelsLight from "../../Icons (Light Mode)/fillReelsLight.svg";
import fillNotificationsLight from "../../Icons (Light Mode)/fillNotificationsLight.svg";
import fillMessagesLight from "../../Icons (Light Mode)/fillMessagesLight.svg";
import fillCreateLight from "../../Icons (Light Mode)/fillCreateLight.svg";
import fillProfileLight from "../../Icons (Light Mode)/fillProfileLight.svg";
import PostLight from "../../Icons (Light Mode)/PostLight.svg";
import VideoLight from "../../Icons (Light Mode)/VideoLight.svg";
import PostModal from "./PostModal";
import VideoModal from "./VideoModal";
import SearchModal from "./SearchModal";
import NotificationsModal from "./NotificationsModal";
import MessagesModal from "./MessagesModal";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../App";
import { UserInfoContext } from "../ProtectedRoute/Protect_Component";

function Navbar({
  activate,
  crt_clk,
  handleSearch,
  handleNotify,
  handleMessage,
}) {
  const [activeItem, setActiveItem] = useState("home");
  const DarkModeSetting = useContext(DarkModeContext);
  const {userName} = useContext(UserInfoContext);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <ul className="navbar navs list-unstyled justify-content-center">
      <Link to="/main" className="text-decoration-none">
        <li
          className={`d-flex gap-3 ${activeItem === "home" ? "active" : ""}`}
          onClick={() => handleItemClick("home")}
        >
          <img
            src={
              activeItem === "home"
                ? DarkModeSetting.darkMode
                  ? Home
                  : HomeLight
                : DarkModeSetting.darkMode
                ? fillHome
                : fillHomeLight
            }
            alt="Home"
          />
          <span
            className={`${
              DarkModeSetting.darkMode ? "text-white" : "text-black"
            } text-decoration-none`}
          >
            Home
          </span>
        </li>
      </Link>

      <li
        data-bs-toggle="offcanvas"
        data-bs-target="#searchkamodal"
        className={`d-flex gap-3 search-container ${
          activeItem === "search" ? "active" : ""
        }`}
        onClick={() => {
          handleItemClick("search");
          handleSearch();
        }}
      >
        <img
          src={
            activeItem === "search"
              ? DarkModeSetting.darkMode
                ? fillSearch
                : fillSearchLight
              : DarkModeSetting.darkMode
              ? Search
              : SearchLight
          }
          alt="Search"
        />
        <span>Search</span>
      </li>

      <Link to="/explore" className="text-decoration-none">
        <li
          className={`d-flex gap-3 ${activeItem === "explore" ? "active" : ""}`}
          onClick={() => handleItemClick("explore")}
        >
          <img
            src={
              activeItem === "explore"
                ? DarkModeSetting.darkMode
                  ? fillExplore
                  : fillExploreLight
                : DarkModeSetting.darkMode
                ? Explore
                : ExploreLight
            }
            alt="Explore"
          />
          <span
            className={`${
              DarkModeSetting.darkMode ? "text-white" : "text-black"
            } text-decoration-none`}
          >
            Explore
          </span>
        </li>
      </Link>

      <Link to="/reels" className="text-decoration-none">
        <li
          className={`d-flex gap-3 ${activeItem === "reels" ? "active" : ""}`}
          onClick={() => handleItemClick("reels")}
        >
          <img
            src={
              activeItem === "reels"
                ? DarkModeSetting.darkMode
                  ? fillReels
                  : fillReelsLight
                : DarkModeSetting.darkMode
                ? Reels
                : ReelsLight
            }
            alt="Reels"
          />
          <span
            className={`${
              DarkModeSetting.darkMode ? "text-white" : "text-black"
            } text-decoration-none`}
          >
            Reels
          </span>
        </li>
      </Link>

      <li
        data-bs-toggle="offcanvas"
        data-bs-target="#messagekamodal"
        className={`d-flex gap-3 message-container ${
          activeItem === "messages" ? "active" : ""
        }`}
        onClick={() => {
          handleItemClick("messages");
          handleMessage();
        }}
      >
        <img
          src={
            activeItem === "messages"
              ? DarkModeSetting.darkMode
                ? fillMessages
                : fillMessagesLight
              : DarkModeSetting.darkMode
              ? Messages
              : MessagesLight
          }
          alt="Messages"
        />
        <span>Messages</span>
      </li>

      <li
        data-bs-toggle="offcanvas"
        data-bs-target="#notifykamodal"
        className={`d-flex gap-3 notify-container ${
          activeItem === "notifications" ? "active" : ""
        }`}
        onClick={() => {
          handleItemClick("notifications");
          handleNotify();
        }}
      >
        <img
          src={
            activeItem === "notifications"
              ? DarkModeSetting.darkMode
                ? fillNotifications
                : fillNotificationsLight
              : DarkModeSetting.darkMode
              ? Notifications
              : NotificationsLight
          }
          alt="Notifications"
        />
        <span>Notifications</span>
      </li>

      <li
        className={`d-flex gap-3 ${activate} create-container ${
          activeItem === "create" ? "active" : ""
        }`}
        id="create"
        onClick={() => {
          crt_clk();
          handleItemClick("create");
        }}
      >
        <img
          src={
            activeItem === "create"
              ? DarkModeSetting.darkMode
                ? fillCreate
                : fillCreateLight
              : DarkModeSetting.darkMode
              ? Create
              : CreateLight
          }
          alt="Create"
        />
        <span
          className={`${
            DarkModeSetting.darkMode ? "text-white" : "text-black"
          } text-decoration-none`}
        >
          Create
        </span>
      </li>

      {activeItem === "create" && (
        <div className="crt_block">
          <div
            className="d-flex justify-content-between post"
            data-bs-toggle="modal"
            data-bs-target="#postModal"
          >
            <span>Post</span>
            <img src={DarkModeSetting.darkMode ? Post : PostLight} alt="Post" />
          </div>
          <div
            className="d-flex justify-content-between live_video"
            data-bs-toggle="modal"
            data-bs-target="#videoModal"
          >
            <span>Live video</span>
            <img
              src={DarkModeSetting.darkMode ? Video : VideoLight}
              alt="Live Video"
            />
          </div>
        </div>
      )}

      <a href={`/${userName}`} className="text-decoration-none">
        <li
          className={`d-flex gap-3 ${activeItem === "profile" ? "active" : ""}`}
          onClick={() => handleItemClick("profile")}
        >
          <img
            src={
              activeItem === "profile"
                ? DarkModeSetting.darkMode
                  ? fillProfile
                  : fillProfileLight
                : DarkModeSetting.darkMode
                ? Profile
                : ProfileLight
            }
            alt="Profile"
          />
          <span
            className={`${
              DarkModeSetting.darkMode ? "text-white" : "text-black"
            }`}
          >
            Profile
          </span>
        </li>
      </a>

      {/* Post Modal */}
      <PostModal />

      {/* Search Offcanvas */}
      <SearchModal />

      {/* Notifications Offcanvas */}
      <NotificationsModal />

      {/* Messages Offcanvas  */}
      <MessagesModal />

      {/* Video Modal */}
      <VideoModal />
    </ul>
  );
}

export default Navbar;
