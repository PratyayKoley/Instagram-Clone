import React, { useState, useEffect, useContext } from "react";
import Reels from "../../JSONS/reels.json";
import Comment from "../../Icons/Comment.svg";
import Share from "../../Icons/Share.svg";
import Saved from "../../Icons/Saved.svg";
import fillSaved from "../../Icons/fillSaved.svg";
import Notifications from "../../Icons/Notifications.svg";
import CommentLight from "../../Icons (Light Mode)/CommentLight.svg";
import ShareLight from "../../Icons (Light Mode)/ShareLight.svg";
import SavedLight from "../../Icons (Light Mode)/SavedLight.svg";
import fillSavedLight from "../../Icons (Light Mode)/fillSavedLight.svg";
import NotificationsLight from "../../Icons (Light Mode)/NotificationsLight.svg";
import { DarkModeContext } from "../../App";

const ReelsContent = () => {
  const DarkModeSetting = useContext(DarkModeContext);
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});

  useEffect(() => {
    const initialLiked = {};
    const initialSaved = {};

    Reels.forEach((item) => {
      initialLiked[item.id] = false;
      initialSaved[item.id] = false;
    });

    setLiked(initialLiked);
    setSaved(initialSaved);
  }, []);

  const increLikes = (postId) => {
    setLiked((prevLiked) => ({
      ...prevLiked,
      [postId]: !prevLiked[postId],
    }));
  };

  const increSaved = (postId) => {
    setSaved((prevLiked) => ({
      ...prevLiked,
      [postId]: !prevLiked[postId],
    }));
  };

  return (
    <div className="reels">
      <div className="reels-container justify-content-center align-items-center gap-5">
        {Reels.map((item) => {
          return (
            <div className="reel-card" key={item.id}>
              <div className="video-wrapper">
                <video
                  className="rounded-3"
                  src={item.video_url}
                  // autoPlay
                  controls
                  loop
                ></video>
              </div>
              <div className="icons d-flex justify-content-between">
                <div className="like_comment_share d-flex gap-3">
                  <div onClick={() => increLikes(item.id)}>
                    {liked[item.id] ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#ff0000"
                        height="24"
                        role="img"
                        viewBox="0 0 48 48"
                        width="24"
                      >
                        <title>Unlike</title>
                        <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                      </svg>
                    ) : ( 
                    DarkModeSetting.darkMode ? (
                      <img src={Notifications} alt="Like" />
                    ) : (
                      <img src={NotificationsLight} alt="Liked" />
                    ))}
                  </div>
                  <img
                    src={DarkModeSetting.darkMode ? Comment : CommentLight}
                    alt="Comment"
                  />
                  <img
                    src={DarkModeSetting.darkMode ? Share : ShareLight}
                    alt="Share"
                  />
                </div>
                <div className="saved" onClick={() => increSaved(item.id)}>
                  {saved[item.id] ? (
                    <img
                      src={
                        DarkModeSetting.darkMode ? fillSaved : fillSavedLight
                      }
                      alt="Saved"
                    />
                  ) : (
                    <img
                      src={DarkModeSetting.darkMode ? Saved : SavedLight}
                      alt="Saved"
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReelsContent;
