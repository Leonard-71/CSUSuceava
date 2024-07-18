import React from "react";
import "./Pozitie.scss";

import teren1 from "../../../assets/teren.png";

const Pozitie = ({ playerDetails }) => {
  const descrierePozitie = {
    portar:
      "Jucătorul ce ocupă poziția de portar reprezintă ultima linie de apărare și este responsabil de protejarea porții, împiedicând adversarii să marcheze.",
    "inter-stanga":
      "Interii sunt jucători versatili, ocupând zone centrale ale terenului și având responsabilități atât în atac, cât și în apărare.",
    "inter-dreapta":
      "Interii sunt jucători versatili, ocupând zone centrale ale terenului și având responsabilități atât în atac, cât și în apărare.",
    pivot:
      "Pivotul ocupă poziția centrală în atac, având rolul de a atașa mingea și de a crea oportunități pentru colegii de echipă.",
    "extrema-stanga":
      "Jucătorii de pe pozițiile extreme sunt responsabili pentru marcarea golurilor și pentru participarea activă la construcția atacului echipei.",
    "extrema-dreapta":
      "Jucătorii de pe pozițiile extreme sunt responsabili pentru marcarea golurilor și pentru participarea activă la construcția atacului echipei.",
    centru:
      "Centrul este responsabil pentru organizarea și distribuirea jocului, fiind adesea un conducător al atacului echipei. El coordonează acțiunile ofensive și distribuie mingea către coechipieri pentru a crea șanse de gol.",
  };

  const pozitii = {
    portar: "Portar",
    "inter-stanga": "Inter stânga",
    "inter-dreapta": "Inter dreapta",
    "extrema-stanga": "Extremă stânga",
    "extrema-dreapta": "Extremă dreapta",
    pivot: "Pivot",
    centru: "Centru",
  };

  if (!playerDetails) return null;

  let { pozitie } = playerDetails;

  let pozitieNoua = pozitie
    .toLowerCase()
    .replace(/ă/g, "a")
    .replace(/â/g, "a")
    .replace(/ /g, "-");
  const textPozitie = descrierePozitie[pozitieNoua];
  const clasaSuplimentara = "activ";
  const activeClass = `cerc ${pozitieNoua} ${clasaSuplimentara}`;

  const pozitiiDiv = Object.keys(pozitii).map((key) => {
    if (key !== pozitieNoua) {
      const pozitieClassName = key
        .toLowerCase()
        .replace(/ă/g, "a")
        .replace(/â/g, "a")
        .replace(/ /g, "-");
      const className = `cerc ${pozitieClassName}`;
      return (
        <div
          key={key}
          className={className}
          data-toggle="tooltip"
          data-placement="top"
          title={pozitii[key]}
        ></div>
      );
    }
    return null;
  });

  return (
    <div className="container">
      <div className="textPozitie">
        <p>{pozitie.toUpperCase()}</p>
      </div>

      <div className="teren">
        <img src={teren1} alt="Imagine teren" />
        <div className="pozitii">
          {pozitiiDiv}
          <div
            className={`cerc ${activeClass}`}
            data-toggle="tooltip"
            data-placement="top"
            title={pozitie}
          ></div>
        </div>
      </div>

      <div className="descriere">
        <p>{textPozitie}</p>
      </div>
    </div>
  );
};

export default Pozitie;
