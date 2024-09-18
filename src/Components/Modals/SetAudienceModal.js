import React, { useContext } from "react";
import { ContextValues } from "../LeftContainer/LeftContainer";

function SetAudienceModal() {

  const Audience_Context = useContext(ContextValues);

  const slct = (modaltext) => {
    if(modaltext === "Public")
        document.querySelector(".public").style.background = "#212121";
    else if(modaltext === "Practice")
        document.querySelector(".practice").style.background = "#212121";
    else
        document.querySelector(".cancel").style.background = "#212121";
    Audience_Context.setText(modaltext);
  };

  return (
    <div className="modal-wrapper d-flex justify-content-center align-items-center">
      {/* Select Modal */}

      <div className="slctmodal d-flex flex-column">
        <div className="public text-center" onClick={() => {Audience_Context.setModal(); slct("Public")}}>
          <p>Public</p>
        </div>
        <div className="practice text-center" onClick={() => {Audience_Context.setModal(); slct("Practice")}}>
          <p>Practice</p>
        </div>
        <div className="cancel text-center" onClick={() => {Audience_Context.setModal(); slct("Audience");}}>Cancel</div>
      </div>
    </div>
  );
}

export default SetAudienceModal;
