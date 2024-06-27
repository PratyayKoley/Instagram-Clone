import React, { useContext } from "react";
import Notifications from "../../Icons/Notifications.svg";
import NotificationsLight from "../../Icons (Light Mode)/NotificationsLight.svg";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../App";

const NavbarResize = () => {
  const DarkModeSetting = useContext(DarkModeContext);
  return (
    <div
      className="navbarResize justify-content-evenly align-items-center mt-4"
      data-bs-theme={DarkModeSetting.darkMode ? "dark" : "light"}
    >
      <div className="searchinputResize container-fluid">
        <form className="d-flex" role="search">
          <input
            className="form-control me-2 search-input"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </div>

      <Link to="/notificationsresized">
        <li className="d-flex gap-3 notify-container me-2">
          <img src={DarkModeSetting.darkMode ? Notifications : NotificationsLight} alt="Notifications" />
        </li>
      </Link>
    </div>
  );
};

export default NavbarResize;
