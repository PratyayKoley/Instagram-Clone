import React, { useContext } from "react";
import Meta from "../../Icons/meta.png";
import FooterResize from "../MidContainer/FooterResize";
import { DarkModeContext } from "../../App";

const NotificationsResized = () => {
  const DarkModeSetting = useContext(DarkModeContext);
  return (
    <div className={`web_bg ${DarkModeSetting.darkMode ? "bg-black text-white" : "bg-white text-black"} w-100 vh-100`}>
      <header>
        <h5 className="text-center">Notifications</h5>
      </header>
      <hr style={{ width: "100%", border: "1px solid #8a8a8a", margin: "0" }} />
      <h6 className="m-3">This week</h6>
      <div className="pop p-3 d-flex justify-content-between">
        <div className="acc-wrap d-flex gap-3">
          <img
            src="https://ashisheditz.com/wp-content/uploads/2023/11/cool-attitude-girl-dp.jpg"
            alt="Own_dp"
          />
          <span className="followups d-flex flex-column justify-content-center">
            <span className="accname w-100">
              <strong>itecheducation.official</strong> started following you.
            </span>
            <span>2d</span>
          </span>
        </div>
        <div className="follow d-flex align-items-center">
          <button className="btn btn-primary px-2 py-1">Follow</button>
        </div>
      </div>
      <div className="pop p-3 d-flex justify-content-between">
        <div className="acc-wrap d-flex gap-3">
          <img
            src="https://ashisheditz.com/wp-content/uploads/2023/11/cool-attitude-girl-dp.jpg"
            alt="Own_dp"
          />
          <span className="followups d-flex flex-column justify-content-center">
            <span className="accname w-100">
              <strong>itecheducation.official</strong> liked your story.
            </span>
            <span>3d</span>
          </span>
        </div>
      </div>
      <hr style={{ width: "100%", border: "1px solid #8a8a8a", margin: "0" }} />
      <h6 className="m-3">This month</h6>
      <div className="meta p-3 d-flex gap-2 align-items-center">
        <img src={Meta} alt="Meta" />
        <span className="w-100">
          This is a yearly reminder of Instagram's Terms of Use. Learn more{" "}
          <span>1w</span>
        </span>
      </div>
      <div className={`footContainer position-fixed w-100 px-3 bottom-0 ${DarkModeSetting.darkMode ? "bg-black" : "bg-white"}`}>
        <FooterResize />
      </div>
    </div>
  );
};

export default NotificationsResized;
