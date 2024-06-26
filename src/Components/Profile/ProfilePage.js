import React, { useContext } from "react";
import "./Profile.css";
import LeftContainer from "../LeftContainer/LeftContainer";
import ProfilePageContent from "./ProfilePageContent";
import { DarkModeContext } from "../../App";

const ProfilePage = () => {
  const DarkModeSetting = useContext(DarkModeContext);
  return (
    <>
      <div className={`web_bg ${DarkModeSetting.darkMode ? "bg-black text-white" : "bg-white text-black"} w-100 vh-100 d-flex`}>
        <LeftContainer />
        <ProfilePageContent />
      </div>
    </>
  );
};

export default ProfilePage;
