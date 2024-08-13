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

const MessagesModal = () => {
  const DarkModeSetting = useContext(DarkModeContext);
  const generalmsg = messages.slice(3, 5);
  const [activeTab, setActiveTab] = useState("primary");
  const offcanvasRightRef = useRef(null);

  const handleTab = (item) => {
    setActiveTab(item);
  };

  const handleCanvas = () => {
    if(offcanvasRightRef.current){
      offcanvasRightRef.current.style.transform = 'translateX(0%)';
      offcanvasRightRef.current.style.visibility = 'visible';
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
                itecheducation.official
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
            {messages.map((item) => (
              <div
                className="msg d-flex justify-content-between mb-3"
                key={item.id}
                onClick={handleCanvas}
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
      <UserMsgModal rightref={offcanvasRightRef}/>
    </>
  );
};

export default MessagesModal;
