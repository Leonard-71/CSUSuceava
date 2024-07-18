import React from 'react';
import './CardEchipaStaff.scss';

const CardEchipaStaff = ({ imagine, nume, prenume, pozitie }) => {
  const imagineURL = `data:image/png;base64,${imagine}`;
  return (
    <div className="card-staff">
        <img src={imagineURL} alt={nume} />
        <div className="text-container-staff">
          <h3>{nume} {prenume}</h3>
          <p>{pozitie}</p>
        </div>
    </div>
  );
};

export default CardEchipaStaff;


