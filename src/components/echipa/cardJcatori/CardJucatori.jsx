import React from 'react';
import './CardJucatori.scss';

import steag from "../../assets/steag.png"

const CardJucatori = ({ player }) => {
  const { nume, prenume, pozitie, nationalitate, dataNasterii, inaltime, imagine } = player;

  const text = {
    pozitie: 'Pozitie:',
    nationalitate: 'Cetățenie:',
    dataNastere: 'Data nașterii:',
    inaltime: 'Înălțime:',
  };

  return (
    <div className="wrapper-team">
      <figure className="image-block">
        <div className="steag">
          <img src={steag} alt="steag" />
        </div>
        <img src={`data:image/jpeg;base64,${imagine}`} alt="imagine" />
        <figcaption>
          <h3><span id="nume">{nume}</span><span className="spatiu" id="prenume">{prenume}</span></h3>
          <p>{text.pozitie} {pozitie}</p>
          <p>{text.nationalitate} {nationalitate}</p>
          <p>{text.dataNastere} {dataNasterii}</p>
          <p>{text.inaltime} {inaltime}</p>
        </figcaption>
      </figure>
    </div>
  );
};

export default CardJucatori;
