import React, { useContext, useRef, useState } from "react";
import Post_Modal from "../../Icons/Post_Modal.svg";
import Post_ModalLight from "../../Icons (Light Mode)/Post_ModalLight.svg";
import { DarkModeContext } from "../../App";

function PostModal() {
  const DarkModeSetting = useContext(DarkModeContext);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileRef = useRef(null);

  const handleClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleChange = (e) => {
    setSelectedFiles(e.target.value);
    console.log(selectedFiles);
  }

  return (
    <div
      className="modal fade"
      id="postModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header justify-content-center">
            <h1 className="modal-title fs-6 text-center" id="exampleModalLabel">
              Create new post
            </h1>
          </div>
          <div className="post_modal modal-body d-flex flex-column gap-3 align-items-center justify-content-center">
            <img src={DarkModeSetting.darkMode ? Post_Modal : Post_ModalLight} alt="PostModal" />
            Drag photos and videos here
          </div>
          <div className="modal-footer justify-content-center">
            <input
              type="file"
              id="post_upload"
              accept="image/*, video/*"
              ref={fileRef}
              multiple
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleClick}
            >
              Select from computer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostModal;
