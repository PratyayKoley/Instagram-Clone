import React from "react";
import SwitchAcc from "../LeftContainer/SwitchAcc";

const OwnAccount = () => {
  return (
    <>
      <div className="accwrapper d-flex justify-content-between">
        <div className="own_acc d-flex gap-3">
          <img
            src="https://pxboom.com/wp-content/uploads/2024/02/anime-insta-dp-boy.jpg"
            alt="Own_dp"
          />
          <span className="accname_username d-flex flex-column justify-content-center">
            <span className="accname fw-bold">itecheducation.official</span>
            <span className="username">ITechEducation.Official</span>
          </span>
        </div>
        <div
          className="switchaccbtn d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#switchacc"
        >
          <span>Switch</span>
        </div>
      </div>

      <SwitchAcc />
      <div className="suggestedforyou my-4 d-flex justify-content-between">
        <span className="fw-semibold">Suggested for you</span>
        <div className="switchaccbtn">
          <span>See All</span>
        </div>
      </div>
    </>
  );
};

export default OwnAccount;
