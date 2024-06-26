import React, {
  useEffect,
  useState,
  createContext,
  useRef,
  useContext,
} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./LeftContainer.css";
import Navbar from "./Navbar";
import NavbarFooter from "./NavbarFooter";
import Insta_Logo from "../../Icons/Insta_Icon.svg";
import Insta_Written from "../../Icons/Insta_Written.svg";
import Insta_Logo_Light from "../../Icons (Light Mode)/Insta_IconLight.svg";
import Insta_Written_Light from "../../Icons (Light Mode)/Insta_WrittenLight.svg";
import { DarkModeContext } from "../../App";

export const ContextValues = createContext();

const LeftContainer = () => {
  const DarkModeSetting = useContext(DarkModeContext);
  const [activate, setActivate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [slcttext, setSlctText] = useState("Audience");
  const [isSearchActivated, setIsSearchActivated] = useState(false);
  const [isNotifyActivated, setIsNotifyActivated] = useState(false);
  const [isMessageActivated, setIsMessageActivated] = useState(false);
  const instaWrittenRef = useRef(null);
  const instaLogoRef = useRef(null);

  const handleSearch = () => setIsSearchActivated(true);
  const handleNotify = () => setIsNotifyActivated(true);
  const handleMessage = () => setIsMessageActivated(true);
  const setText = (text) => setSlctText(text);
  const setModal = () => setShowModal(false);
  const crt_clk = () => {
    setActivate(activate === "show" ? "" : "show");
  };

  useEffect(() => {
    const root = document.documentElement;
    if(!DarkModeSetting.darkMode)
      {
        root.style.setProperty('--backgroundColor', '#fff');
        root.style.setProperty('--textColor', '#000');
        root.style.setProperty('--modalBackgroundColor', '#fff');
        root.style.setProperty('--moreHover', '#ededed');
        root.style.setProperty('--navbarHover', '#ededed');
        root.style.setProperty('--createModalHover', '#ededed');
        root.style.setProperty('--hiddenBackground', '#efefef');
        root.style.setProperty('--setAudienceBorder', '#ededed');
        root.style.setProperty('--messageHover', '#f7f7f7');
        root.style.setProperty('--live_videoInputBackground', '#f5f5f5');
        root.style.setProperty('--secondaryTextColor', '#737373');
        root.style.setProperty('--addStoryBackgroundColor', '#fafafa');
        root.style.setProperty('--profileActiveTab', '#121212');
        root.style.setProperty('--storyBorderColor', '#ededed');
        root.style.setProperty('--addStoryBorderColor', '#e1e1e1');
        root.style.setProperty('--rightContainerButton', '#0095f6');
        root.style.setProperty('--rightContainerButtonHover', '#00376b');
        root.style.setProperty('--borderLeft', '#ededed');
        root.style.setProperty('--scrollbarTrack', '#fff');
        root.style.setProperty('--scrollbarThumb', '#EEDFCC');
        root.style.setProperty('--modalShadow', '0 4px 8px rgba(0, 0, 0, 0.65)');
      }
      else{
        root.style.setProperty('--textColor', '#fff');
        root.style.setProperty('--modalBackgroundColor', '#262626');
        root.style.setProperty('--moreHover', '#4a4a4a');
        root.style.setProperty('--navbarHover', '#1a1a1a');
        root.style.setProperty('--modalShadow', 'none');
        root.style.setProperty('--createModalHover', '#323436');
        root.style.setProperty('--hiddenBackground', '#363636');
        root.style.setProperty('--messageHover', '#262626');
        root.style.setProperty('--secondaryTextColor', '#a8a8a8');
        root.style.setProperty('--setAudienceBorder', '#363636');
        root.style.setProperty('--storyBorderColor', '#333333');
        root.style.setProperty('--profileActiveTab', '#a8a8a8');
        root.style.setProperty('--live_videoInputBackground', '#1a1a1a');
        root.style.setProperty('--addStoryBackgroundColor', '#121212');
        root.style.setProperty('--addStoryBorderColor', '#343434');
        root.style.setProperty('--rightContainerButton', '#0078c6');
        root.style.setProperty('--rightContainerButtonHover', '#fff');
        root.style.setProperty('--borderLeft', '#2a2a2a');
        root.style.setProperty('--scrollbarTrack', '#1a1a1a');
        root.style.setProperty('--scrollbarThumb', '#262626');
      }
  })

  useEffect(() => {
    document.body.addEventListener("click", function (e) {
      if (!e.target.closest("#create")) {
        setActivate("");
      }
      if (!e.target.contains(document.querySelector(".slct"))) {
        setModal();
      }
      if (
        !e.target.closest(".search-container") &&
        !e.target.closest(".message-container") &&
        !e.target.closest(".notify-container") &&
        !e.target.closest(".searchmodal") &&
        !e.target.closest(".create-container") &&
        !e.target.closest("#more") &&
        isSearchActivated
      ) {
        setIsSearchActivated(false);
      }
      if (
        !e.target.closest(".search-container") &&
        !e.target.closest(".message-container") &&
        !e.target.closest(".notify-container") &&
        !e.target.closest(".notifymodal") &&
        !e.target.closest(".create-container") &&
        !e.target.closest("#more") &&
        isNotifyActivated
      ) {
        setIsNotifyActivated(false);
      }
      if (
        !e.target.closest(".search-container") &&
        !e.target.closest(".message-container") &&
        !e.target.closest(".notify-container") &&
        !e.target.closest(".messagemodal") &&
        !e.target.closest(".create-container") &&
        !e.target.closest("#more") &&
        isNotifyActivated
      ) {
        setIsMessageActivated(false);
      }
    });
  }, [
    activate,
    showModal,
    isSearchActivated,
    isNotifyActivated,
    isMessageActivated,
  ]);

  useEffect(() => {
    if (isSearchActivated || isNotifyActivated || isMessageActivated) {
      document.querySelectorAll(".navbar li span").forEach((span) => {
        span.style.display = "none";
      });
      document.querySelectorAll(".navfoot li span").forEach((span) => {
        span.style.display = "none";
      });
      document.querySelector(".navfoot li .threads").style.display = "none";

      instaLogoRef.current.style.display = "block";
      instaWrittenRef.current.style.display = "none";

      document.querySelectorAll(".navbar li").forEach((li) => {
        li.style.width = "fit-content";
      });
      document.querySelectorAll(".navfoot li").forEach((li) => {
        li.style.width = "fit-content";
      });
    } else {
      document.querySelectorAll(".navbar li span").forEach((span) => {
        span.style.display = "";
      });
      document.querySelectorAll(".navfoot li span").forEach((span) => {
        span.style.display = "";
      });

      instaLogoRef.current.style.display = "";
      instaWrittenRef.current.style.display = "";

      document.querySelectorAll(".navbar li").forEach((li) => {
        li.style.width = "";
      });
      document.querySelectorAll(".navfoot li").forEach((li) => {
        li.style.width = "";
      });
    }
  }, [isSearchActivated, isNotifyActivated, isMessageActivated]);

  return (
    <div
      className={`left_container ${
        DarkModeSetting.darkMode ? "text-white" : "text-black"
      }`}
    >
      {/* Logo */}
      <div className="m-4 icon_container">
        <img
          id="instalogo"
          ref={instaLogoRef}
          src={DarkModeSetting.darkMode ? Insta_Logo : Insta_Logo_Light}
          alt="Insta Logo"
          className="mb-5"
        />
        <img src={DarkModeSetting.darkMode ? Insta_Written : Insta_Written_Light} alt="Insta Written" ref={instaWrittenRef} />
      </div>

      {/* Navbar */}
      <ContextValues.Provider
        value={{ slcttext, setText, setModal, showModal, setShowModal }}
      >
        <Navbar
          activate={activate}
          crt_clk={crt_clk}
          handleSearch={handleSearch}
          handleNotify={handleNotify}
          handleMessage={handleMessage}
        />
      </ContextValues.Provider>

      {/* Navbar ka Footer */}
      <NavbarFooter />
    </div>
  );
};

export default LeftContainer;
