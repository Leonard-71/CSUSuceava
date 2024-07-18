import React, { useState } from "react";
import "./Stire.scss";
import Share from "./share/Share";
import { FaWindowClose } from "react-icons/fa";

const Stire = ({ titlu, descriere, imagine }) => {
  const [showDiv, setShowDiv] = useState(true);

  const handleCloseDiv = () => {
    setShowDiv(false);
  };

  return (
    <>
      {showDiv && (
        <div className="stire" id="stire">
          <div className="buton-close" onClick={handleCloseDiv}>
            <FaWindowClose className="dimensiune-close" />
          </div>
          <h4>{titlu}</h4>
          <p>{descriere}</p>
          {imagine ? (
            <div className="centered-image">
              <img className="imagineHome" src={imagine} alt={`Imagine`} />
            </div>
          ) : null}
          <div className="buton-share">
            <Share />
          </div>
        </div>
      )}
    </>
  );
};

export default Stire;
