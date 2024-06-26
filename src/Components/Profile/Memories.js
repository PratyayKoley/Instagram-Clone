import React, { useContext } from "react";
import Add from "../../Icons/Add.svg";
import AddLight from "../../Icons (Light Mode)/AddLight.svg";
import { DarkModeContext } from "../../App";

const Memories = () => {
  const DarkModeSetting = useContext(DarkModeContext);
  return (
    <>
      <div className="memories mt-3">
        <div className="circle1">
          <span>
            <img src={DarkModeSetting.darkMode ? Add : AddLight} alt="Add a story" />
          </span>
        </div>
      </div>
      <span className="fw-bold">New</span>
    </>
  );
};

export default Memories;
