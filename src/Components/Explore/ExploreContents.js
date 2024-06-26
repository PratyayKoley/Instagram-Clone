import React from "react";
import explore from "../../JSONS/explore.json";

const ExploreContents = () => {
  return (
    <>
    <div className="explorecontents">
      <div className="cards-container justify-content-center m-5 gap-2">
        {explore.map((item) => (
          <div key={item.id} className="card">
            <img src={item.img} className="img-thumbnail" alt={item.alt} />
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ExploreContents;
