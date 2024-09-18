import React, { useEffect, useState, createContext, useContext } from "react";
import Threads from "../../Icons/Threads.svg";
import More from "../../Icons/More.svg";
import Arrow from "../../Icons/Arrow.svg";
import Settings from "../../Icons/Settings.svg";
import Activity from "../../Icons/Activity.svg";
import Saved from "../../Icons/Saved.svg";
import Moon from "../../Icons/Moon.svg";
import Report from "../../Icons/Report.svg";
import LessThan from "../../Icons/LessThan.svg";
import ThreadsLight from "../../Icons (Light Mode)/ThreadsLight.svg";
import MoreLight from "../../Icons (Light Mode)/MoreLight.svg";
import SettingsLight from "../../Icons (Light Mode)/SettingsLight.svg";
import ActivityLight from "../../Icons (Light Mode)/ActivityLight.svg";
import SavedLight from "../../Icons (Light Mode)/SavedLight.svg";
import MoonLight from "../../Icons (Light Mode)/MoonLight.svg";
import SunLight from "../../Icons (Light Mode)/SunLight.svg";
import ReportLight from "../../Icons (Light Mode)/ReportLight.svg";
import LessThanLight from "../../Icons (Light Mode)/LessThanLight.svg";
import { DarkModeContext } from "../../App";
import SwitchAcc from "../Modals/SwitchAcc";
import ReportProblem from "../Modals/ReportProblem";
import { useNavigate } from "react-router-dom";

export const ModeContext = createContext();

function NavbarFooter() {
  const DarkModeSetting = useContext(DarkModeContext);
  const [active, setActive] = useState("");
  const [appearanceActive, setAppearanceActive] = useState(false);
  const navigate = useNavigate();

  const change = () => {
    setActive(active === "show" ? "" : "show");
  };

  const appearance = () => {
    setAppearanceActive(!appearanceActive);
  };

  const handleDarkModeToggle = () => {
    DarkModeSetting.setDarkMode(!DarkModeSetting.darkMode);
  };

  const handleswitch = (e) => {
    if (e.target.id !== "flexSwitchCheckChecked") {
      handleDarkModeToggle();
    }
  };

  const handleBackClick = () => {
    setAppearanceActive(false);
    setActive("show");
  };

  const handleNavigation = () => {
    navigate("/profilepage", { state: { activeTab: "saved" } });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".switch_appearance") &&
        !e.target.closest("#switch")
      ) {
        setAppearanceActive(false);
      }
      if (!e.target.closest("#more") && !e.target.closest("#back")) {
        setActive("");
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <ul
        className={`m-2 navfoot d-flex flex-column list-unstyled ${
          DarkModeSetting.darkMode ? "text-white" : "text-black"
        }`}
      >
        <a
          className={`text-decoration-none ${
            DarkModeSetting.darkMode ? "text-white" : "text-black"
          }`}
          target="_blank"
          rel="noreferrer"
          href="https://www.threads.net/?xmt=AQGzUtLTwvfZTF3YGHTC-NfAMr4P4EoqUoC6e56sC7U_K2Q"
        >
          <li className="d-flex gap-3">
            <img
              src={DarkModeSetting.darkMode ? Threads : ThreadsLight}
              alt="Threads"
            />
            <span>Threads</span>
            <img className="threads" src={Arrow} alt="Arrow" />
          </li>
        </a>
        <li className={`d-flex gap-3 ${active}`} id="more" onClick={change}>
          <img src={DarkModeSetting.darkMode ? More : MoreLight} alt="More" />
          <span>More</span>
        </li>

        <div className={`moreoptions ${active}`}>
          <div className="d-flex gap-3 elements mt-2">
            <img
              src={DarkModeSetting.darkMode ? Settings : SettingsLight}
              alt="Settings"
            />
            <span>Settings</span>
          </div>
          <div className="d-flex gap-3 elements">
            <img
              src={DarkModeSetting.darkMode ? Activity : ActivityLight}
              alt="Activity"
            />
            <span>Your activity</span>
          </div>
          <div className="d-flex gap-3 elements" onClick={handleNavigation}>
            <img
              src={DarkModeSetting.darkMode ? Saved : SavedLight}
              alt="Saved"
            />
            <span>Saved</span>
          </div>
          <div
            className="d-flex gap-3 elements"
            id="switch"
            onClick={() => {
              appearance();
              change();
            }}
          >
            <img
              src={DarkModeSetting.darkMode ? Moon : MoonLight}
              alt="Theme"
            />
            <span>Switch appearance</span>
          </div>
          <div
            className="d-flex gap-3 elements"
            data-bs-toggle="modal"
            data-bs-target="#reportModal"
          >
            <img
              src={DarkModeSetting.darkMode ? Report : ReportLight}
              alt="Report"
            />
            <span>Report a problem</span>
          </div>
          <hr className="my-2" style={{ borderTop: "6px solid #555555" }} />
          <div
            className="d-flex elements"
            data-bs-toggle="modal"
            data-bs-target="#switchacc"
          >
            <span>Switch accounts</span>
          </div>
          <hr className="my-1" style={{ borderTop: "2px solid #555555" }} />
          <div
            className="d-flex elements mb-2"
            onClick={handleLogout}
          >
            <span>Logout</span>
          </div>
        </div>

        <SwitchAcc />
        <ReportProblem />
        <div className={`switch_appearance ${appearanceActive ? "show" : ""}`}>
          <div className="head my-1 d-flex justify-content-between">
            <div className="d-flex gap-2 align-items-center">
              <img
                id="back"
                src={DarkModeSetting.darkMode ? LessThan : LessThanLight}
                alt="Back"
                style={{ cursor: "pointer" }}
                onClick={handleBackClick}
              />
              <span>
                <strong>Switch appearance</strong>
              </span>
            </div>
            <div className="moon_sun">
              <img
                src={DarkModeSetting.darkMode ? Moon : SunLight}
                alt="Theme"
              />
            </div>
          </div>
          <hr className="m-0" />
          <div
            className="d-flex justify-content-between dmode my-2"
            onClick={handleswitch}
          >
            <span>Dark mode</span>
            <div className="form-check form-switch">
              <input
                className="form-check-input custom-switch"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
                checked={DarkModeSetting.darkMode}
                onChange={handleDarkModeToggle}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      </ul>
    </>
  );
}

export default NavbarFooter;
