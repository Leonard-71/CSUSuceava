import React from 'react';
import './CardAntrenor.scss';

const CardAntrenor = ({ imagine, nume, prenume, pozitie }) => {
  const imagineURL = `data:image/png;base64,${imagine}`;

  return (
      <div className="card-antrenor">
        <img src={imagineURL} alt={nume} />
        <div className="text-container-antrenor">
          <h3>{nume} {prenume}</h3>
          <p>{pozitie}</p>
        </div>
      </div>
  );
};

export default CardAntrenor;
