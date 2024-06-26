import React, { useContext } from "react";
import Meta from "../../Icons/meta.png";
import { DarkModeContext } from "../../App";

const NotificationsModal = () => {
  const DarkModeSetting = useContext(DarkModeContext);
  return (
    <>
      <div
        className={`notifymodal offcanvas offcanvas-start ${DarkModeSetting.darkMode ? "bg-black text-white" : "bg-white text-black"} rounded-2 overflow-y-auto`}
        data-bs-scroll="true"
        tabIndex="-1"
        id="notifykamodal"
      >
        <div className="offcanvas-header d-flex flex-column align-items-start gap-3">
          <h4 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            Notifications
          </h4>
            <h6>This week</h6>
          <div className="offcanvas-body">
            <div className="pop d-flex justify-content-between">
              <div className="acc-wrap d-flex gap-3">
                <img
                  src="https://ashisheditz.com/wp-content/uploads/2023/11/cool-attitude-girl-dp.jpg"
                  alt="Own_dp"
                />
                <span className="followups d-flex flex-column justify-content-center">
                  <span className="accname w-75">
                    <strong>itecheducation.official</strong> started following
                    you.
                  </span>
                  <span>2d</span>
                </span>
              </div>
              <div className="follow d-flex align-items-center">
                <button className="btn btn-primary px-2 py-1">Follow</button>
              </div>
            </div>
            <div className="pop d-flex justify-content-between">
              <div className="acc-wrap d-flex gap-3">
                <img
                  src="https://ashisheditz.com/wp-content/uploads/2023/11/cool-attitude-girl-dp.jpg"
                  alt="Own_dp"
                />
                <span className="followups d-flex flex-column justify-content-center">
                  <span className="accname w-75">
                    <strong>itecheducation.official</strong> liked your story.
                  </span>
                  <span>3d</span>
                </span>
              </div>
            </div>
          </div>
          <hr style={{ width: "100%", border: "1px solid #8a8a8a", margin: "0"}}/>
          <h6>This month</h6>
          <div className="meta d-flex gap-2 align-items-center">
            <img src={Meta} alt="Meta" />
            <span className="w-100">
              This is a yearly reminder of Instagram's Terms of Use. Learn more{" "}
              <span>1w</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationsModal;
