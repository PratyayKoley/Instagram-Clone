import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FooterResize from "../MidContainer/FooterResize";
import Settings from "../../Icons/Settings.svg";
import Dropdown from "../../Icons/Drop_Down.svg";
import Threads from "../../Icons/Threads.svg";
import Add from "../../Icons/Add.svg";
import ProfPosts from "../../Icons/ProfilePosts.svg";
import ProfReels from "../../Icons/ProfileReels.svg";
import ProfSaved from "../../Icons/ProfileSaved.svg";
import ProfTagged from "../../Icons/ProfileTagged.svg";
import SettingsLight from "../../Icons (Light Mode)/SettingsLight.svg";
import DropdownLight from "../../Icons (Light Mode)/Drop_DownLight.svg";
import ThreadsLight from "../../Icons (Light Mode)/ThreadsLight.svg";
import AddLight from "../../Icons (Light Mode)/AddLight.svg";
import ProfPostsLight from "../../Icons (Light Mode)/ProfilePostsLight.svg";
import ProfReelsLight from "../../Icons (Light Mode)/ProfileReelsLight.svg";
import ProfSavedLight from "../../Icons (Light Mode)/ProfileSavedLight.svg";
import ProfTaggedLight from "../../Icons (Light Mode)/ProfileTaggedLight.svg";
import profposts from "../../JSONS/posts.json";
import SwitchAcc from "../Modals/SwitchAcc";
import { DarkModeContext } from "../../App";
import { UserInfoContext } from "../ProtectedRoute/Protect_Component";

const ProfileResized = () => {
  const DarkModeSetting = useContext(DarkModeContext);
  const [activeTab, setActiveTab] = useState("posts");
  const { pathname } = useLocation();
  const { userName } = useContext(UserInfoContext);
  const [realname, setRealname] = useState("");
  const [username, setUsername] = useState("");
  const [numfollowers, setNumFollowers] = useState("");
  const [numfollowing, setNumFollwing] = useState("");
  const [numposts, setNumPosts] = useState("");
  const [bio, setBio] = useState(""); 

  const handleTab = (item) => {
    setActiveTab(item);
  };

  const pullProfileInfo = async () => {

    
    const RequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: pathname.split("/")[1],
      }),
    };

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_LINK}/get-profile-data`,
      RequestOptions
    );

    const data = await response.json();

    setRealname(data.realname);
    setUsername(data.username);
    setNumFollowers(data.num_followers);
    setNumFollwing(data.num_following);
    setNumPosts(data.num_posts);
    setBio(data.bio);
  };

  useEffect(() => {
    pullProfileInfo();
  }, [userName]);

  return (
    <div
      className={`web_bg ${
        DarkModeSetting.darkMode ? "bg-black text-white" : "bg-white text-black"
      } w-100`}
      data-bs-theme={DarkModeSetting.darkMode ? "dark" : "light"}
    >
      <div className="profile flex-column vh-100">
        <div
          className={`profilenavresize p-3 w-100 position-fixed d-flex ${
            DarkModeSetting.darkMode ? "bg-black" : "bg-white"
          } justify-content-between align-items-center top-0 z-1`}
        >
          <img
            src={DarkModeSetting.darkMode ? Settings : SettingsLight}
            alt="Settings"
          />
          <div
            className="switch_acc d-flex align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#switchacc"
          >
            <h6
              className="offcanvas-title m-0"
              id="offcanvasWithBothOptionsLabel"
            >
              {username}
            </h6>
            <img
              src={DarkModeSetting.darkMode ? Dropdown : DropdownLight}
              alt="Switch"
              className="ms-2"
            />
          </div>
          <a href="https://www.threads.net/?xmt=AQGzUtLTwvfZTF3YGHTC-NfAMr4P4EoqUoC6e56sC7U_K2Q" target="_blank" rel="noreferrer">
            <img
              src={DarkModeSetting.darkMode ? Threads : ThreadsLight}
              alt="Threads"
            />
          </a>
        </div>
        <SwitchAcc />
        <div className="profileinfo d-flex flex-column flex-md-row gap-3 gap-md-5 align-items-center mt-5 pt-4">
          <div className="dp">
            <img
              src="https://pxboom.com/wp-content/uploads/2024/02/anime-insta-dp-boy.jpg"
              alt="Own_dp"
              className="img-fluid rounded-circle"
            />
          </div>
          <div className="accinfo d-flex flex-column w-100">
            <div className="username d-flex flex-column flex-md-row gap-2 align-items-center">
              <div className="name fw-medium">{username}</div>
              <div className="d-flex gap-2 mt-2 mt-md-0">
                <button type="button" className="button btn btn-light btn-sm">
                  Edit profile
                </button>
                <button type="button" className="button btn btn-light btn-sm">
                  View archive
                </button>
                <button type="button" className="button btn btn-light btn-sm">
                  Ad tools
                </button>
              </div>
              <hr
                style={{
                  border: "1px solid #8a8a8a",
                  width: "100%",
                  margin: "0",
                }}
              />
            </div>
            <div className="number d-flex justify-content-center gap-3 gap-md-5 mt-2">
              <span>
                <strong>{numposts}</strong> posts
              </span>
              <span>
                <strong>{numfollowers}</strong> followers
              </span>
              <span>
                <strong>{numfollowing}</strong> following
              </span>
            </div>
            <hr
              style={{
                border: "1px solid #8a8a8a",
                width: "100%",
                marginBottom: "0",
              }}
            />
            <div className="accname mt-3 d-flex align-items-center flex-column gap-0">
              <span className="fw-semibold">{realname}</span>
              <span className="fw-lighter">{bio}</span>
            </div>
          </div>
          <hr style={{ border: "1px solid #8a8a8a", width: "100%" }} />
          <div className="memories mt-0 d-flex flex-column align-items-center">
            <div className="circle1 d-flex justify-content-center align-items-center">
              <span>
                <img
                  src={DarkModeSetting.darkMode ? Add : AddLight}
                  alt="Add a story"
                  className="img-fluid"
                />
              </span>
            </div>
            <span className="fw-bold mt-2">New</span>
          </div>
          <hr style={{ border: "1px solid #8a8a8a", width: "100%" }} />

          <ul
            className="postnav nav nav-pills mb-3 w-100 d-flex justify-content-evenly"
            id="pills-tab"
            role="tablist"
          >
            <li
              className="nav-item"
              role="presentation"
              onClick={() => handleTab("posts")}
            >
              <div
                className="nav-link active d-flex align-items-center gap-2"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                <img
                  src={DarkModeSetting.darkMode ? ProfPosts : ProfPostsLight}
                  alt="Profile Posts"
                />
              </div>
            </li>
            <li
              className="nav-item"
              role="presentation"
              onClick={() => handleTab("reels")}
            >
              <div
                className="nav-link d-flex align-items-center gap-2"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                <img
                  src={DarkModeSetting.darkMode ? ProfReels : ProfReelsLight}
                  alt="Profile Reels"
                />
              </div>
            </li>
            <li
              className="nav-item"
              role="presentation"
              onClick={() => handleTab("saved")}
            >
              <div
                className="nav-link d-flex align-items-center gap-2"
                id="pills-contact-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-contact"
                type="button"
                role="tab"
                aria-controls="pills-contact"
                aria-selected="false"
              >
                <img
                  src={DarkModeSetting.darkMode ? ProfSaved : ProfSavedLight}
                  alt="Profile Saved"
                />
              </div>
            </li>
            <li
              className="nav-item"
              role="presentation"
              onClick={() => handleTab("tagged")}
            >
              <div
                className="nav-link d-flex align-items-center gap-2"
                id="pills-disabled-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-disabled"
                type="button"
                role="tab"
                aria-controls="pills-disabled"
                aria-selected="false"
              >
                <img
                  src={DarkModeSetting.darkMode ? ProfTagged : ProfTaggedLight}
                  alt="Profile Tagged"
                />
              </div>
            </li>
          </ul>

          <div className="proposts">
            <div className="post2-container container text-center">
              <div className="row row-cols-3">
                {activeTab === "posts" &&
                  profposts.map((item) => (
                    <div className="col mb-3 mx-0" key={item.id}>
                      <img src={item.src} alt="" className="img-fluid" />
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {activeTab === "reels" && (
            <div className="proreels my-5">
              <h3 className="text-center">Capture your moment</h3>
              <div
                type="button"
                className="fw-semibold text-primary text-center fs-6"
              >
                Create your first reel
              </div>
            </div>
          )}

          {activeTab === "saved" && (
            <div className="prosaved my-5">
              <h3 className="text-center">Save</h3>
              <div className="fw-light fs-6 text-center">
                Save photos and videos that you want to see again.
              </div>
              <div className="fw-light fs-6">
                No one is notified, and only you can see what you've saved.
              </div>
            </div>
          )}

          {activeTab === "tagged" && (
            <div className="protagged my-5">
              <h3 className="text-center">Photos of you</h3>
              <span className="fw-light fs-6">
                When people tag you in photos, they'll appear here.
              </span>
            </div>
          )}
        </div>

        <div
          className={`footContainer position-fixed w-100 px-3 bottom-0 ${
            DarkModeSetting.darkMode ? "bg-black" : "bg-white"
          } z-1`}
        >
          <FooterResize />
        </div>
      </div>
    </div>
  );
};

export default ProfileResized;
