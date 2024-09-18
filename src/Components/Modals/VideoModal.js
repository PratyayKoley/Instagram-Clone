import React, { useContext } from "react";
import Video_Modal from "../../Icons/Video_Modal.svg";
import Video_ModalLight from "../../Icons (Light Mode)/Video_ModalLight.svg";
import SetAudienceModal from "../Modals/SetAudienceModal";
import { ContextValues } from "../LeftContainer/LeftContainer";
import { DarkModeContext } from "../../App";

function VideoModal() {
  const Video_context = useContext(ContextValues);
  const DarkModeSetting = useContext(DarkModeContext);

  return (
    <div
      className="modal-container modal fade"
      id="videoModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header justify-content-center">
            <h1 className="modal-title fs-6 text-center" id="exampleModalLabel">
              Live video
            </h1>
          </div>
          <div className="video_modal modal-body d-flex flex-column align-items-center justify-content-center">
            <img
              className="my-4"
              src={DarkModeSetting.darkMode ? Video_Modal : Video_ModalLight}
              alt="VideoModal"
            />
            <h4 className="my-3">Add live video details</h4>
            <span>
              Go live by connecting to your choice of streaming software. To get
              started,
            </span>
            <span>
              add a title and select the audience for your live video.
            </span>
            <div className="col-auto">
              <input
                type="text"
                id="inputtext"
                className={`form-control my-3 ${
                  DarkModeSetting.darkMode ? "text-white" : "text-black"
                }`}
                placeholder="Add a title"
                autoComplete="off"
              />
            </div>
            <span
              className={`slct ${
                DarkModeSetting.darkMode ? "text-white" : "text-black"
              }`}
              onClick={() => Video_context.setShowModal(true)}
            >
              {Video_context.slcttext}
              <svg
                fill="currentColor"
                height="16"
                role="img"
                viewBox="0 0 24 24"
                width="16"
              >
                <title>Audience</title>
                <path d="M12 17.502a1 1 0 0 1-.707-.293l-9-9.004a1 1 0 0 1 1.414-1.414L12 15.087l8.293-8.296a1 1 0 0 1 1.414 1.414l-9 9.004a1 1 0 0 1-.707.293Z"></path>
              </svg>
            </span>
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className={`btn btn-primary mb-4 py-1 ${
                Video_context.slcttext === "Audience" ? "disabled" : ""
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {Video_context.showModal && (
        <SetAudienceModal
          settext={Video_context.setText}
          closemodal={Video_context.setModal}
        />
      )}
    </div>
  );
}

export default VideoModal;
