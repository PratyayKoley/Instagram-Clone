import React from "react";
import suggested from "../../JSONS/suggested.json";

const Suggested = () => {
  return (
    <>
      {suggested.map((item) => (
        <div
          className="accwrapper mb-3 d-flex justify-content-between"
          key={item.id}
        >
          <div className="own_acc d-flex gap-3">
            <img src={item.dp_url} alt="Profile Pic" />
            <span className="accname_username d-flex flex-column justify-content-center">
              <span className="accname fw-bold">{item.accname}</span>
              <span className="username">{item.username}</span>
            </span>
          </div>
          <div className="switchaccbtn d-flex align-items-center">
            <span>Follow</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default Suggested;
