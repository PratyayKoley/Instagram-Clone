import React, {useContext} from "react";
import { DarkModeContext } from "../../App";

const UserMsgModal = ({rightref}) => {
  const DarkModeSetting = useContext(DarkModeContext);
  return (
    <div>
      <div
        className={`msgoffcanvas offcanvas offcanvas-end ${
          DarkModeSetting.darkMode
            ? "bg-black text-white"
            : "bg-white text-black"
        } rounded-2`}
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        ref={rightref}
        style={{ visibility: 'hidden', transform: 'translateX(100%)', width: '69.3%', maxWidth: '100%' }}
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasRightLabel">
            Offcanvas right
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">...</div>
      </div>
    </div>
  );
};

export default UserMsgModal;
