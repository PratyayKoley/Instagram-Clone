import React, { useContext, useState, useRef } from "react";
import Dropdown from "../../Icons/Drop_Down.svg";
import New_Chat from "../../Icons/New_Chat.svg";
import Hidden from "../../Icons/Hidden.svg";
import GreaterThan from "../../Icons/GreaterThan.svg";
import DropdownLight from "../../Icons (Light Mode)/Drop_DownLight.svg";
import New_ChatLight from "../../Icons (Light Mode)/New_ChatLight.svg";
import HiddenLight from "../../Icons (Light Mode)/HiddenLight.svg";
import GreaterThanLight from "../../Icons (Light Mode)/GreaterThanLight.svg";
import SwitchAcc from "./SwitchAcc";
import messages from "../../JSONS/stories.json";
import { DarkModeContext } from "../../App";
import UserMsgModal from "./UserMsgModal";
import { UserInfoContext } from "../ProtectedRoute/Protect_Component";

const MessagesModal = ({ allUsers }) => {  
  const DarkModeSetting = useContext(DarkModeContext);
  const { userName } = useContext(UserInfoContext);
  const generalmsg = messages.slice(3, 5);
  const [activeTab, setActiveTab] = useState("primary");
  const offcanvasRightRef = useRef(null);
  const [selectedUser,setSelectedUser] = useState(null);
  const [recepientStatus, setRecepientStatus] = useState(false);
  const [recUsername, setRecUsername] = useState(null);

  const handleTab = (item) => {
    setActiveTab(item);
  };

  const handleCanvas = () => {
    if (offcanvasRightRef.current) {
      offcanvasRightRef.current.style.transform = "translateX(0%)";
      offcanvasRightRef.current.style.visibility = "visible";
    }
  };

  const checkUserOnline = async (recepientUsername) => {
    try {
      const RequestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          recuserName: recepientUsername,
        })
      }

      const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/is-user-online`, RequestOptions);

      const data = await response.json()

      if(data.online){
        console.log(`User is online ${data.socket_id}`);
        setRecepientStatus(true);
      }
      else{
        console.log("User is offline");
        setRecepientStatus(false);
      }
    }
    catch (err) {
      console.error("Error checking user status", err);
    }
  }

  return (
    <>
      <div
        className={`messagemodal offcanvas offcanvas-start ${
          DarkModeSetting.darkMode
            ? "bg-black text-white"
            : "bg-white text-black"
        } rounded-2`}
        data-bs-scroll="true"
        tabIndex="-1"
        id="messagekamodal"
      >
        <div
          className="offcanvas-header d-flex flex-column align-items-start gap-4"
          data-bs-theme={DarkModeSetting.darkMode ? "dark" : "light"}
        >
          <div className="acc d-flex justify-content-between w-100">
            <div
              className="switch_acc d-flex"
              data-bs-toggle="modal"
              data-bs-target="#switchacc"
            >
              <h5
                className="offcanvas-title"
                id="offcanvasWithBothOptionsLabel"
              >
                {userName}
              </h5>
              <img
                src={DarkModeSetting.darkMode ? Dropdown : DropdownLight}
                alt="Switch"
              />
            </div>
            <img
              src={DarkModeSetting.darkMode ? New_Chat : New_ChatLight}
              alt="New Chat"
            />
          </div>
          <div className="msgtype w-100">
            <ul
              className="navmessage nav-underline d-flex justify-content-between ps-0"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <div
                  className="nav-link active"
                  id="pills-primary-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                  onClick={() => handleTab("primary")}
                >
                  Primary
                </div>
              </li>
              <li className="nav-item" role="presentation">
                <div
                  className="nav-link"
                  id="pills-general-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                  onClick={() => setActiveTab("general")}
                >
                  General
                </div>
              </li>
              <li className="nav-item" role="presentation">
                <div
                  className="nav-link"
                  id="pills-requests-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                  onClick={() => setActiveTab("requests")}
                >
                  Requests
                </div>
              </li>
            </ul>
          </div>
          <hr
            className="m-0"
            style={{ width: "100%", border: "1px solid #8a8a8a" }}
          />
        </div>

        {activeTab === "primary" && (
          <div className="offcanvas-body">
            {allUsers.length > 0 ? (
              allUsers.map((item) => (
                <div
                  className="msg d-flex justify-content-between mb-3"
                  key={item.id}
                  onClick={() => {
                    handleCanvas();
                    setSelectedUser(item.realname);
                    checkUserOnline(item.username);
                    setRecUsername(item.username);
                  }}
                  data-bs-toggle="offcanvas"
                  data-bs-target="#messagekamodal"
                >
                  <div className="msg-wrap d-flex gap-3">
                    <img
                      src="https://pxboom.com/wp-content/uploads/2024/02/anime-insta-dp-boy.jpg"
                      alt="Own_dp"
                    />
                    <span className="followups d-flex flex-column justify-content-center">
                      <span className="acc_name w-100">
                        <strong>{item.realname}</strong>
                      </span>
                      <span>{item.username}</span>
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <h6>No users Found</h6>
            )}
          </div>
        )}

        {activeTab === "general" && (
          <div className="offcanvas-body">
            {generalmsg.map((item) => (
              <div
                className="msg d-flex justify-content-between mb-3"
                key={item.id}
              >
                <div className="msg-wrap d-flex gap-3">
                  <img src={item.dp_url} alt="Own_dp" />
                  <span className="followups d-flex flex-column justify-content-center">
                    <span className="acc_name w-100">
                      <strong>{item.user_name}</strong>
                    </span>
                    <span>{item.last_active}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "requests" && (
          <div className="offcanvas-body">
            <div className="hide w-100 d-flex justify-content-between">
              <div className="eyeicon d-flex gap-3 align-items-center">
                <div className="eyeimg d-flex justify-content-center align-items-center">
                  <img
                    src={DarkModeSetting.darkMode ? Hidden : HiddenLight}
                    alt="Hidden Eye"
                  />
                </div>
                <span>Hidden Requests</span>
              </div>
              <div className="greaterthan d-flex align-items-center me-2">
                <img
                  src={
                    DarkModeSetting.darkMode ? GreaterThan : GreaterThanLight
                  }
                  alt="Greater Than"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <SwitchAcc />
      <UserMsgModal rightref={offcanvasRightRef} selectedUser={selectedUser} recepientStatus={recepientStatus} recUsername={recUsername} />
    </>
  );
};

export default MessagesModal;
