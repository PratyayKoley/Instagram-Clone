import React, { useState, useRef, useEffect, useContext } from "react";
import ThreeDots from "../../Icons/ThreeDots.svg";
import Comment from "../../Icons/Comment.svg";
import Share from "../../Icons/Share.svg";
import Saved from "../../Icons/Saved.svg";
import Emoji from "../../Icons/Emoji.svg";
import fillSaved from "../../Icons/fillSaved.svg";
import Notifications from "../../Icons/Notifications.svg";
import ThreeDotsLight from "../../Icons (Light Mode)/ThreeDotsLight.svg";
import CommentLight from "../../Icons (Light Mode)/CommentLight.svg";
import ShareLight from "../../Icons (Light Mode)/ShareLight.svg";
import SavedLight from "../../Icons (Light Mode)/SavedLight.svg";
import EmojiLight from "../../Icons (Light Mode)/EmojiLight.svg";
import fillSavedLight from "../../Icons (Light Mode)/fillSavedLight.svg";
import NotificationsLight from "../../Icons (Light Mode)/NotificationsLight.svg";
import posts from "../../JSONS/stories.json";

import { DarkModeContext } from "../../App";

const Posts = () => {
  const DarkModeSetting = useContext(DarkModeContext);
  const [numLikes, setNumLikes] = useState({});
  const [numComments, setNumComments] = useState({});
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const [showPostBtn, setShowPostBtn] = useState({});
  const [overflowedText, setOverflowedText] = useState({});
  const textRef = useRef({});
  const moreRef = useRef({});
  const inputRef = useRef({});

  useEffect(() => {
    // Initialize state variables with data from JSON
    const initialNumLikes = {};
    const initialNumComments = {};
    const initialLiked = {};
    const initialShowPostBtn = {};
    const initialOverflowText = {};
    const initialSaved = {};

    posts.forEach((item) => {
      initialNumLikes[item.id] = item.num_likes;
      initialNumComments[item.id] = item.num_comments;
      initialSaved[item.id] = false;
      initialLiked[item.id] = false; // Assuming none of the posts are initially liked
      initialShowPostBtn[item.id] = false; // Assuming post button is initially hidden for all posts
      initialOverflowText[item.id] = false; // Initially assuming no text is overflowing
    });

    setNumLikes(initialNumLikes);
    setNumComments(initialNumComments);
    setLiked(initialLiked);
    setSaved(initialSaved);
    setShowPostBtn(initialShowPostBtn);
    setOverflowedText(initialOverflowText);
  }, []);

  useEffect(() => {
    posts.forEach((item) => {
      const element = textRef.current[item.id];
      if (element) {
        if (element.scrollWidth > element.clientWidth) {
          setOverflowedText((prevOverflow) => ({
            ...prevOverflow,
            [item.id]: true,
          }));
        }
      }
    });
  }, []);

  const increLikes = (postId) => {
    setLiked((prevLiked) => ({
      ...prevLiked,
      [postId]: !prevLiked[postId],
    }));

    setNumLikes((prevNumLikes) => ({
      ...prevNumLikes,
      [postId]: prevNumLikes[postId] + (liked[postId] ? -1 : 1),
    }));
  };

  const increSaved = (postId) => {
    setSaved((prevLiked) => ({
      ...prevLiked,
      [postId]: !prevLiked[postId],
    }));
  };

  const handleDoubleClick = (postId) => {
    setLiked((prevLiked) => {

      if(!prevLiked[postId])
        {
          setNumLikes((prevNumLikes) => ({
            ...prevNumLikes,
            [postId]: prevNumLikes[postId] + 1,
          }));
          return {
            ...prevLiked,
            [postId]: true,
        } 
      };
      return prevLiked;
    });
  };

  const handleText = (postId) => {
    moreRef.current[postId].style.display = "none";
    textRef.current[postId].style.overflow = "visible";
    textRef.current[postId].style.textWrap = "wrap"; // Allows text to wrap
  };

  const handleChange = (postId) => {
    if (inputRef.current[postId].value !== "") {
      setShowPostBtn((prevShowPostBtn) => ({
        ...prevShowPostBtn,
        [postId]: true,
      }));
    } else {
      setShowPostBtn((prevShowPostBtn) => ({
        ...prevShowPostBtn,
        [postId]: false,
      }));
    }
  };

  const handlePost = (postId) => {
    inputRef.current[postId].value = "";
    setShowPostBtn((prevShowPostBtn) => ({
      ...prevShowPostBtn,
      [postId]: false,
    }));
    setNumComments((prevNumComments) => ({
      ...prevNumComments,
      [postId]: prevNumComments[postId] + 1,
    }));
  };

  return (
    <div className="post_container flex-column align-items-center flex-nowrap overflow-y-auto">
      {posts.map((item) => (
        <div className="posts" key={item.id}>
          <header className="d-flex justify-content-between align-items-center">
            <div className="user_info d-flex gap-2 align-items-center">
              <div className="circle" style={{ width: "40px", height: "40px" }}>
                <span
                  style={{
                    background: `url('${item.dp_url}') top center`,
                    backgroundSize: "cover",
                  }}
                ></span>
              </div>
              <span>
                <strong>{item.user_name}</strong>
              </span>
              <span>
                <strong>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#a8a8a8"
                    height="24"
                    role="img"
                    viewBox="0 0 10 24"
                    width="10"
                  >
                    <circle cx="6" cy="12" r="2"></circle>
                  </svg>
                </strong>
              </span>
              <span>{item.time_posted}</span>
            </div>
            <div
              className="query_for_post"
              data-bs-toggle="modal"
              data-bs-target="#reportposts"
            >
              <img
                src={DarkModeSetting.darkMode ? ThreeDots : ThreeDotsLight}
                alt="More options"
              />
            </div>
          </header>
          <img
            className="post-img img-fluid object-fit-contain w-100 rounded-3 my-2"
            src={item.post_url}
            alt="Post"
            onDoubleClick={() => handleDoubleClick(item.id)}
          />
          <footer className="mt-2">
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
                  ) : DarkModeSetting.darkMode ? (
                    <img src={Notifications} alt="Like" />
                  ) : (
                    <img src={NotificationsLight} alt="Liked" />
                  )}
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
                    src={DarkModeSetting.darkMode ? fillSaved : fillSavedLight}
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
            <div className="num_likes mt-2">{numLikes[item.id]} likes</div>
            <div className="comment d-flex gap-2 mb-2 mt-1">
              <span>{item.user_name}</span>
              <span ref={(el) => (textRef.current[item.id] = el)}>
                {item.desc}
              </span>
              {overflowedText[item.id] && (
                <span
                  ref={(el) => (moreRef.current[item.id] = el)}
                  onClick={() => handleText(item.id)}
                >
                  more
                </span>
              )}
            </div>
            <div className="num_comment mb-1">
              View all {numComments[item.id]} comments
            </div>
            <div className="input_comment d-flex justify-content-between align-items-center">
              <input
                className={`form-control form-control-sm bg-transparent ${
                  DarkModeSetting.darkMode ? "text-white" : "text-black"
                }`}
                type="text"
                placeholder="Add a comment"
                style={{ width: "85%", border: "none" }}
                onChange={() => handleChange(item.id)}
                ref={(el) => (inputRef.current[item.id] = el)}
              />
              {showPostBtn[item.id] && (
                <div
                  className="postbtn text-primary"
                  onClick={() => handlePost(item.id)}
                >
                  <strong>Post</strong>
                </div>
              )}
              <div className="emoji">
                <img
                  src={DarkModeSetting.darkMode ? Emoji : EmojiLight}
                  alt="Emoji"
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </footer>
          <hr />
        </div>
      ))}

      <div
        className="modal fade"
        id="reportposts"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="reportpost modal-content text-center">
            <div className="report fw-bold text-danger">Report</div>
            <hr className="m-0" style={{ color: "#a8a8a8" }} />
            <div className="unfollow fw-bold text-danger">Unfollow</div>{" "}
            <hr className="m-0" style={{ color: "#a8a8a8" }} />
            <div className="addfav">Add to favorites</div>
            <hr className="m-0" style={{ color: "#a8a8a8" }} />
            <div className="gotopost">Go to post</div>
            <hr className="m-0" style={{ color: "#a8a8a8" }} />
            <div className="shareto">Share to...</div>
            <hr className="m-0" style={{ color: "#a8a8a8" }} />
            <div className="copylink">Copy link</div>
            <hr className="m-0" style={{ color: "#a8a8a8" }} />
            <div className="embed">Embed</div>
            <hr className="m-0" style={{ color: "#a8a8a8" }} />
            <div className="aboutthisacc">About this account</div>
            <hr className="m-0" style={{ color: "#a8a8a8" }} />
            <div className="cancel" data-bs-dismiss="modal">
              Cancel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
