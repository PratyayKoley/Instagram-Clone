import React, { useContext } from "react";
import LeftContainer from "../LeftContainer/LeftContainer";
import ReelsContent from "./ReelsContent";
import FooterResize from "../MidContainer/FooterResize";
import "./Reels.css";
import { DarkModeContext } from "../../App";

const Reels = () => {
  const DarkModeSetting = useContext(DarkModeContext);
  return (
    <div className={`web_bg ${DarkModeSetting.darkMode ? "bg-black text-white" : "bg-white text-black"} w-100 vh-100 d-flex`}>
      <LeftContainer />
      <ReelsContent />
      <div className={`footContainer position-fixed w-100 px-3 bottom-0 ${DarkModeSetting.darkMode ? "bg-black" : "bg-white"}`}>
        <FooterResize />
      </div>
    </div>
  );
};

export default Reels;
