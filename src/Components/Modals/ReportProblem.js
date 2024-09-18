import React, { useContext, useRef } from "react";
import { DarkModeContext } from "../../App";

const ReportProblem = () => {
  const TextareaRef = useRef(null);
  
  const handleTextarea = () => {
    const text = TextareaRef.current.value;
    if (text === "") {
      document.querySelector(".sendreport").classList.add("disabled");
    } else {
      document.querySelector(".sendreport").classList.remove("disabled");
      document.querySelector(".sendreport").removeAttribute("disabled");
    }
  };

//   useEffect(() => {
//     document.querySelector(".sendreport").classList.add("disabled");
//   }, []);

  const DarkModeSetting = useContext(DarkModeContext);
  return (
    <>
      <div
        className="reportmodal modal fade"
        id="reportModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-theme={DarkModeSetting.darkMode ? "dark" : "light"}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h6 className="modal-title w-100 text-center" id="exampleModalLabel">
                Report a problem
              </h6>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Please include as much info as possible ..."
                  id="exampleFormControlTextarea1"
                  rows="3"
                  ref={TextareaRef}
                  onChange={handleTextarea}
                ></textarea>
                <div className="buttons d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="sendreport btn btn-primary py-1" disabled
                  >
                    Send report
                  </button>
                  <button type="button" className="addfile btn btn-primary py-1">
                    Add file
                  </button>
                </div>
                <p className="para mt-3">Your Instagram username and browser information will be automatically included in your report.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportProblem;
