import React, { useState, useEffect } from "react";
import "./Clasament.scss";
import "./script";

import ligaLogo from "../../assets/logoLiga.png";

const TabelClasament = ({ data }) => {
  const textTabelClasament = {
    pozitia: "Pozitia",
    echipa: "Echipa",
    meciuriJucate: "Juc",
    victorii: "V",
    egaluri: "E",
    puncteP: "P",
    goluriMarcate: "GM",
    goluriPrimite: "GP",
    diferentaGoluri: "GDif",
    victoriiAcasa: "VA",
    egaluriAcasa: "EA",
    victoriiDeplasare: "VD",
    egaluriDeplasare: "ED",
    puncteAnotare: "PtsA",
    punctePrimite: "PtsD",
    puncte: "Puncte",
  };

  return (
    <div className="container-clasament">
      <table className="tableTeam">
        <thead>
          <tr className="trTeam">
            <th className="thTeam">{textTabelClasament.pozitia}</th>
            <th className="thTeam">{textTabelClasament.echipa}</th>
            <th className="thTeam">{textTabelClasament.meciuriJucate}</th>
            <th className="thTeam">{textTabelClasament.victorii}</th>
            <th className="thTeam">{textTabelClasament.egaluri}</th>
            <th className="thTeam">{textTabelClasament.puncteP}</th>
            <th className="thTeam">{textTabelClasament.goluriMarcate}</th>
            <th className="thTeam">{textTabelClasament.goluriPrimite}</th>
            <th className="thTeam">{textTabelClasament.diferentaGoluri}</th>
            <th className="thTeam">{textTabelClasament.victoriiAcasa}</th>
            <th className="thTeam">{textTabelClasament.egaluriAcasa}</th>
            <th className="thTeam">{textTabelClasament.victoriiDeplasare}</th>
            <th className="thTeam">{textTabelClasament.egaluriDeplasare}</th>
            <th className="thTeam">{textTabelClasament.puncteAnotare}</th>
            <th className="thTeam">{textTabelClasament.punctePrimite}</th>
            <th className="thTeam">{textTabelClasament.puncte}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="trTeam">
              <td className="tdTeam">{item.Pos}</td>
              <td className="tdTeam">{item.NumeEchipa}</td>
              <td className="tdTeam">{item.Meciuri}</td>
              <td className="tdTeam">{item.Victorii}</td>
              <td className="tdTeam">{item.Egaluri}</td>
              <td className="tdTeam">{item.Infrangeri}</td>
              <td className="tdTeam">{item.GoluriMarcate}</td>
              <td className="tdTeam">{item.GoluriPrimite}</td>
              <td className="tdTeam">{item.DiferentaGoluri}</td>
              <td className="tdTeam">{item.VictoriiAcasa}</td>
              <td className="tdTeam">{item.EgaluriAcasa}</td>
              <td className="tdTeam">{item.VictoriiDeplasare}</td>
              <td className="tdTeam">{item.EgaluriDeplasare}</td>
              <td className="tdTeam">{item.PuncteAcasa}</td>
              <td className="tdTeam">{item.PuncteDeplasare}</td>
              <td className="tdTeam">{item.Puncte}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Clasament = ({ data }) => {
  const textClasament = {
    titlu: "Clasament",
    subtitlu: "Handbal masculin",
    anul: "2023/2024",
    liga: "Liga națională de handbal masculin",
    sezonul: "Sezonul 2023 - 2024",
  };

  const [dateExemplu, setPlayersData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5050/api/clasament")
      .then((response) => response.json())
      .then((data) => {
        setPlayersData(data);
      })
      .catch((error) => {
        console.error("A apărut o eroare:", error);
      });
  }, []);

  return (
    <div className="meciuri">
      <div className="textClasament">
        <h1 className="textHClasament">{textClasament.titlu}</h1>
        <h5 className="textPClasament">{textClasament.subtitlu}</h5>
        <h6 className="textPClasament">{textClasament.anul}</h6>
      </div>
      <div className="containerClasament">
        <div className="containerLiga">
          <div className="columnLiga">
            <div className="ligaMasculin">
              <img
                src={ligaLogo}
                alt="Logo Liga Masculin"
                className="imgLiga"
              />
            </div>
          </div>
          <div className="columnLiga2">
            <h5>{textClasament.liga}</h5>
            <h6>{textClasament.sezonul}</h6>
          </div>
        </div>

        <TabelClasament data={dateExemplu} />
      </div>
    </div>
  );
};

export default Clasament;
