import React from 'react'
import './Intro.scss'

const Intro = ({ playerDetails }) => {
    if (!playerDetails) return null;

    return (
      <div className="infoJucator">
        <h2>{`${playerDetails.nume} ${playerDetails.prenume}`}</h2>
        {playerDetails.imagine && (
          <div className="imgJucator">
            <img
              src={`data:image/png;base64,${playerDetails.imagine}`}
              alt={`${playerDetails.nume} ${playerDetails.prenume}`}
            />
          </div>
        )}
      </div>
    );
  };
export default Intro
