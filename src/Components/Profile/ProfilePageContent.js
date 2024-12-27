import React, { useContext, useState, useEffect } from "react";
import Memories from "./Memories";
import AddUser from "../../Icons/AddUser.svg"
import Settings from "../../Icons/Settings.svg";
import ProfilePosts from "./ProfilePosts";
import ProfPosts from "../../Icons/ProfilePosts.svg";
import ProfReels from "../../Icons/ProfileReels.svg";
import ProfSaved from "../../Icons/ProfileSaved.svg";
import ProfTagged from "../../Icons/ProfileTagged.svg";
import ThreeDots from "../../Icons/ThreeDots.svg";
import ThreeDotsLight from "../../Icons (Light Mode)/ThreeDotsLight.svg";
import AddUserLight from "../../Icons (Light Mode)/AddUserLight.svg"
import SettingsLight from "../../Icons (Light Mode)/SettingsLight.svg";
import ProfPostsLight from "../../Icons (Light Mode)/ProfilePostsLight.svg";
import ProfReelsLight from "../../Icons (Light Mode)/ProfileReelsLight.svg";
import ProfSavedLight from "../../Icons (Light Mode)/ProfileSavedLight.svg";
import ProfTaggedLight from "../../Icons (Light Mode)/ProfileTaggedLight.svg";
import { DarkModeContext } from "../../App";
import { useLocation } from "react-router-dom";
import { UserInfoContext } from "../ProtectedRoute/Protect_Component";
import FollowersModal from "../Modals/FollowersModal";
import FollowingModal from "../Modals/FollowingModal";

const ProfilePageContent = () => {
  const { pathname } = useLocation();
  const location = useLocation();
  const { state } = location;
  const { userName } = useContext(UserInfoContext);
  const DarkModeSetting = useContext(DarkModeContext);
  const [activeTab, setActiveTab] = useState(state?.activeTab || "posts");
  const [currentUserID, setCurrentUserID] = useState("");
  const [realname, setRealname] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [followers, setFollowers] = useState([]);
  const [following, setFollwing] = useState([]);
  const [numposts, setNumPosts] = useState("");
  const [followResponse, setFollowResponse] = useState(false);
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);

  const handleTab = (item) => {
    setActiveTab(item);
  };

  const getUserData = async () => {
    try {
      const RequestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
        }),
      };

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_LINK}/get-user-data`,
        RequestOptions
      );

      const data = await response.json();
      if (!data.userData) {
        alert("User not found");
      } else {
        setCurrentUserID(data.user_id);
        return data.user_id; // Return the user ID
      }
    } catch (error) {
      console.error("Error: ", error);
      alert(error.message);
    }
  };

  const pullProfileInfo = async (userId) => {
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
    setUserId(data.id);
    setFollowers(data.followers || []);
    setFollwing(data.following || []);
    setNumPosts(data.num_posts);
    setBio(data.bio);

    if (data.followers && data.followers.includes(userId)) {
      setFollowResponse(true);
    } else {
      setFollowResponse(false);
    }
  };

  useEffect(() => {
    if (userName) {
      setLoading(true);
      getUserData().then((userId) => {
        if (userId) {
          pullProfileInfo(userId)
            .then(() => setLoading(false));
        }
      });
    }
  }, [userName]);

  useEffect(() => {
    if (state?.activeTab) {
      document.querySelector(".savedTab").classList.add("active");
      document.querySelector(".postTab").classList.remove("active");
    }
  }, [state]);

  const handleFollow = async () => {
    if (userName !== username) {
      try {
        const RequestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            [followResponse ? "userToUnfollowID" : "userToFollowID"]: userId,
            currentUserID: currentUserID,
          }),
        };

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_LINK}/${followResponse ? "unfollow" : "follow"}`,
          RequestOptions
        );

        const data = await response.json();

        if (data.success) {
          const updatedFollowers = followResponse
            ? followers.filter((id) => id !== currentUserID)
            : [...followers, currentUserID];
          setFollowers(updatedFollowers);
          setFollowResponse(!followResponse);
        } else {
          alert(`Unable to ${followResponse ? "unfollow" : "follow"}. Please try again.`);
        }
      } catch (error) {
        console.error(error);
        alert(`Error: ${error.message}`);
      }
    } else {
      alert("You cannot follow yourself.");
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center profile">
        <div
          style={{
            width: "65px",
            height: "65px",
            borderRadius: "50%",
            border: "6px solid transparent",
            borderTop: "6px solid #f09433", 
            borderRight: "6px solid #e6683c",
            borderBottom: "6px solid #dc2743",
            borderLeft: "6px solid #cc2366",
            animation: "spin 1.5s linear infinite",
            boxSizing: "border-box",
          }}
        ></div>
      </div>
    )
  }

  return (
    <div className="profile flex-column">
      <div className="profileinfo d-flex gap-5 align-items-center">
        <div className="dp">
          <img
            src="https://pxboom.com/wp-content/uploads/2024/02/anime-insta-dp-boy.jpg"
            alt="Own_dp"
          />
        </div>
        <div className="accinfo d-flex flex-column">
          <div className="username d-flex gap-2 align-items-center">
            <div className="name fw-medium me-4">{username}</div>
            {userName === username ? (
              <>
                <button type="button" className="button btn fw-semibold">
                  Edit profile
                </button>
                <button type="button" className="button btn fw-semibold">
                  View archive
                </button>
                <button type="button" className="button btn fw-semibold">
                  Ad tools
                </button>
                <img
                  src={DarkModeSetting.darkMode ? Settings : SettingsLight}
                  alt="Settings"
                />
              </>
            ) : (
              <>
                <button type="button" className={`btn ${followResponse ? "button" : "btn-primary"} fw-semibold`} onClick={handleFollow}>
                  {followResponse ? "Following" : "Follow"}
                </button>
                <button className="button btn">
                  <img
                    className="p-1"
                    src={DarkModeSetting.darkMode ? AddUser : AddUserLight}
                    alt="Settings"
                  />
                </button>
                <img
                  src={DarkModeSetting.darkMode ? ThreeDots : ThreeDotsLight}
                  alt="Settings"
                />
              </>
            )}
          </div>
          <div className="number d-flex gap-5 mt-4">
            <span style={{ cursor: "pointer" }}>
              <strong>{numposts}</strong> posts
            </span>
            <span style={{ cursor: "pointer" }} data-bs-target="#followersModal" data-bs-toggle="modal">
              <strong>{followers.length}</strong> followers
            </span>
            <span style={{ cursor: "pointer" }} data-bs-target="#followingModal" data-bs-toggle="modal">
              <strong>{following.length}</strong> following
            </span>
          </div>
          <div className="accname mt-3 d-flex flex-column gap-0">
            <span className="fw-semibold">{realname}</span>
            <span className="fw-lighter">{bio}</span>
          </div>
        </div>
      </div>

      <hr style={{ border: "1px solid #8a8a8a", width: "80%" }} />
      <Memories />
      <hr style={{ border: "1px solid #8a8a8a", width: "80%" }} />
      <ul className="postnav nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li
          className="nav-item"
          role="presentation"
          onClick={() => handleTab("posts")}
        >
          <div
            className="postTab nav-link active d-flex align-items-center gap-2"
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
            POSTS
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
            REELS
          </div>
        </li>
        <li
          className="nav-item"
          role="presentation"
          onClick={() => handleTab("saved")}
        >
          <div
            className="savedTab nav-link d-flex align-items-center gap-2"
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
            SAVED
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
            TAGGED
          </div>
        </li>
      </ul>

      <ProfilePosts activeTab={activeTab} userID={userId} followersIDs={followers} followingIDs={following} currentUserID={currentUserID} />
      <FollowersModal followersIDs={followers} currentUserID={currentUserID} username={username} />
      <FollowingModal followingIDs={following} currentUserID={currentUserID} username={username} />
    </div>
  );
};

export default ProfilePageContent;
