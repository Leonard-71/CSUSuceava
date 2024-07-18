import React, { useState } from 'react';
import './CardNoutati.scss';
import lipsaImagine from '../../assets/lipsaImagine.png';

const CardNoutati = ({ stire }) => {
  const { imagine1, titlu, continut } = stire;
  const textLink = 'Afla mai multe →';

  const handleRedirect = () => {
    window.location.href = '/';
  };

  const [showMore, setShowMore] = useState(false);

  const truncatedTitle = titlu.length > 40 ? `${titlu.slice(0, 40)}...` : titlu;
  const truncatedContent = showMore ? continut : `${continut.slice(0, 110)}...`;

  return (
    <div>
      <div className="card">
        <div className='imagineCard'>
          <img
            src={imagine1 ? `data:image/png;base64, ${imagine1}` : lipsaImagine}
            alt="Imagine știre"
            className="card-img-top"
          />
        </div>
        <div className="continutText">
          <h5 className="titluStire">{truncatedTitle}</h5>
          <p className="continutStire">{truncatedContent}</p>
          <button className="butonLink" onClick={handleRedirect}>
            {textLink}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardNoutati;
