import React from 'react'
import './CardJunior.scss';

const CardJunior = ({ imagine, nume, prenume, pozitie }) => {
  const imagineURL = `data:image/png;base64,${imagine}`;
  return (
    <div className="card-junior">
        <img src={imagineURL} alt={'Imagine ' + nume + ' '+ prenume} />
        <div className="text-container-junior">
          <h3>{nume} {prenume}</h3>
          <p>{pozitie}</p>
        </div>
    </div>
  );
};

export default CardJunior
