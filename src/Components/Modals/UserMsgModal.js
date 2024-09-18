import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../App";
import { UserInfoContext } from "../ProtectedRoute/Protect_Component";
import EmojisLight from "../../Icons (Light Mode)/EmojisLight.svg";
import VoiceLight from "../../Icons (Light Mode)/VoiceMsgLight.svg";
import GalleryLight from "../../Icons (Light Mode)/GalleryLight.svg";
import LikeLight from "../../Icons (Light Mode)/LikeLight.svg";
import Emojis from "../../Icons/Emojis.svg";
import Voice from "../../Icons/VoiceMsg.svg";
import Gallery from "../../Icons/Gallery.svg";
import Like from "../../Icons/Like.svg";
import { IoSend } from "react-icons/io5";
import { io } from "socket.io-client";

const UserMsgModal = ({ rightref, selectedUser, recepientStatus, recUsername }) => {
  const { userName } = useContext(UserInfoContext);
  const [msg, setMsg] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newsocket = io(`${process.env.REACT_APP_BACKEND_LINK}`);
    setSocket(newsocket);

    return () => {
      newsocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket === null) return;

    socket.emit("user-connect", userName);

    socket.on("receive_message", (data) => {
      setMessages((prevMsgs) => [
        ...prevMsgs,
        { from: data.from, message: data.message },
      ]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket, userName]);

  const handleSendMsg = () => {
    if (msg.trim() && socket) {
      socket.emit("send-message", {
        from: userName,
        to: recUsername,
        message: msg,
      });
      setMessages((prevMsgs) => [
        ...prevMsgs,
        { from: userName, message: msg },
      ]);
      setMsg("");
    }
  };

  const handleClose = () => {
    if (rightref.current) {
      rightref.current.style.transform = "translateX(100%)";
      rightref.current.style.visibility = "hidden";
    }
  };

  const DarkModeSetting = useContext(DarkModeContext);

  return (
    <div>
      <div
        className={`msgoffcanvas offcanvas offcanvas-end ${
          DarkModeSetting.darkMode
            ? "bg-black text-white"
            : "bg-white text-black"
        } rounded-2 w-100`}
        data-bs-theme={DarkModeSetting.darkMode ? "dark" : "light"}
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        ref={rightref}
        style={{
          visibility: "hidden",
          transform: "translateX(100%)",
        }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            <div className="userinfo">
              <div className="msg-wrap d-flex gap-2 align-items-center">
                <img
                  src="https://pxboom.com/wp-content/uploads/2024/02/anime-insta-dp-boy.jpg"
                  alt="Own_dp"
                />
                <span className="followups d-flex flex-column justify-content-center">
                  <span className="acc_name w-100">
                    <strong>{selectedUser}</strong>
                  </span>
                  <span>{recepientStatus ? "Online" : "Offline"}</span>
                </span>
              </div>
            </div>
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={handleClose}
            data-bs-toggle="offcanvas"
            data-bs-target="#messagekamodal"
          ></button>
        </div>
        <hr className="mt-0" />
        <div className="offcanvas-body position-relative">
          <div className="msgsection">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.from === userName ? "sent" : "received"
                }`}
              >
                <strong>{msg.from}: </strong>
                {msg.message}
              </div>
            ))}
          </div>

          <div className="msginput position-absolute bottom-0 start-0 d-flex justify-content-center gap-4 w-100 align-items-center">
            <div className="mb-3 d-flex gap-3 ms-5 w-75 h-100">
              <img
                src={DarkModeSetting.darkMode ? Emojis : EmojisLight}
                alt="Emoji"
                style={{ cursor: "pointer" }}
              />
              <input
                type="text"
                className="form-control rounded-4 h-auto"
                id="exampleFormControlInput1"
                placeholder="Message..."
                value={msg}
                style={{ background: "transparent" }}
                onChange={(e) => setMsg(e.target.value)}
              />
            </div>
            <div className="msgInputOptions d-flex gap-3 me-5 mb-3">
              <IoSend
                className="fs-4"
                style={{ cursor: "pointer" }}
                onClick={handleSendMsg}
              />
              <img
                src={DarkModeSetting.darkMode ? Voice : VoiceLight}
                alt="Voice"
                style={{ cursor: "pointer" }}
              />
              <img
                src={DarkModeSetting.darkMode ? Gallery : GalleryLight}
                alt="Gallery"
                style={{ cursor: "pointer" }}
              />
              <img
                src={DarkModeSetting.darkMode ? Like : LikeLight}
                alt="Like"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMsgModal;
