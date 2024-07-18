import React from "react";
import "./MeciuriJucate.scss";
import logoLiga from "../../assets/logoLiga.png";

const MeciuriJucate = ({
  data,
  etapa,
  locatia,
  logoEchipa1,
  numeEchipa1,
  scorEchipa1,
  logoEchipa2,
  numeEchipa2,
  scorEchipa2,
}) => {
  const raportMeci = "Raport Meci";

  return (
    <div className="container-meciuri-jucate">
      <div className="card-meciuri-jucate">
        <div className="wrapper-container-jucate">
          <div className="logo-container-jucate">
            <img src={logoLiga} alt="Logo" className="logo-liga-jucate" />
          </div>
          <div className="info-container-jucate">
            <p>{etapa}</p>
            <p>{locatia}</p>
          </div>
          <div className="bara-verticala-jucate"></div>
          <div className="info-data-jucate">
            <p>{data}</p>
          </div>
        </div>
        <div className="elemente-jucate">
          <div className="container-echipa-gazda">
            <p className="nume-echipa-gazda">{numeEchipa1}</p>
            <img src={logoEchipa1} alt="Logo" className="logo-echipa-gazda" />
            <div className="scor-meci-gazda">{scorEchipa1}</div>
          </div>
          <div className="separator-scor-meci"></div>
          <div className="container-echipa-oaspete">
            <div className="scor-meci-oaspete">{scorEchipa2}</div>
            <img src={logoEchipa2} alt="Logo" className="logo-echipa-oaspete" />
            <p className="nume-echipa-oaspete">{numeEchipa2}</p>
          </div>
        </div>
        <div className="container-raport-meci">
          <button className="raport-meci-jucate">{raportMeci}</button>
        </div>
      </div>
    </div>
  );
};

export default MeciuriJucate;
