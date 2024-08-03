import React, { useContext } from "react";
import LeftContainer from "../LeftContainer/LeftContainer";
import { DarkModeContext } from "../../App";
import Error from "./LoggedIn_Error";
import Logout_NotFound from "./Logout_NotFound";
import Logout_Error from "./Loggedout_Error";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";

const NotFound = ({ isVerified }) => {
  const navigate = useNavigate();
  const Logout_login_handle = (authmode) => {
    navigate("/", { state: { authmode } });
  };

  const DarkModeSetting = useContext(DarkModeContext);
  return (
    <>
      {isVerified && (
        <div
          className={`web_bg ${
            DarkModeSetting.darkMode
              ? "bg-black text-white"
              : "bg-white text-black"
          } w-100 vh-100 d-flex`}
        >
          <LeftContainer />
          <Error />
        </div>
      )}
      {
        <div className="web_bg w-100 vh-100">
          <Logout_NotFound handlebuttons={Logout_login_handle}/>
          <hr className="mt-0" />
          <Logout_Error handlebuttons={Logout_login_handle}/>
        </div>
      }
    </>
  );
};

export default NotFound;
