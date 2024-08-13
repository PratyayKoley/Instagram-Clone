import React, { useEffect, useState, useContext } from "react";
import SwitchAcc from "../LeftContainer/SwitchAcc";
import { UserInfoContext } from "../ProtectedRoute/Protect_Component";

const OwnAccount = () => {
  const { userName } = useContext(UserInfoContext);
  const [realname, setRealname] = useState("");
  const [username, setUsername] = useState("");

  const fetchUserData = async () => {
    const RequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: userName }),
    };

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_LINK}/get-user-data`,
      RequestOptions
    );
    const data = await response.json();

    setRealname(data.realname);
    setUsername(data.username);
  };
  useEffect(() => {
    fetchUserData();
  }, [userName]);

  return (
    <>
      <div className="accwrapper d-flex justify-content-between">
        <div className="own_acc d-flex gap-3">
          <img
            src="https://pxboom.com/wp-content/uploads/2024/02/anime-insta-dp-boy.jpg"
            alt="Own_dp"
          />
          <span className="accname_username d-flex flex-column justify-content-center">
            <span className="accname fw-bold">{username}</span>
            <span className="username">{realname}</span>
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
