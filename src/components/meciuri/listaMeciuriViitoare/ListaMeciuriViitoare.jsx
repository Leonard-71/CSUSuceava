import React, { useState, useEffect } from "react";
import MeciuriViitoare from "../meciuriVitoare/MeciuriViitoare";
import "./ListaMeciuriViitoare.scss";

const ListaMeciuriViitoare = () => {
  const textShowMore = "Vezi toate meciurile";
  const textShowLess = "Vezi mai putin";

  const [echipeDetails, setEchipeDetails] = useState({});
  const [showAll, setShowAll] = useState(false);
  const [finishedMatches, setFinishedMatches] = useState([]);
  const [echipaImages, setEchipaImages] = useState({});

  const fetchTeamDetails = (teamId) => {
    fetch(`http://localhost:5050/api/echipa/${teamId}`)
      .then((response) => response.json())
      .then((echipaData) => {
        console.log(`Detalii echipa ${teamId}:`, echipaData);
        if (echipaData.nume && echipaData.imagine) {
          setEchipeDetails((prevDetails) => ({
            ...prevDetails,
            [`${teamId}_nume`]: echipaData.nume,
          }));
          setEchipaImages((prevImages) => ({
            ...prevImages,
            [`${teamId}_logo`]: `data:image/jpeg;base64,${echipaData.imagine}`,
          }));
        }
      })
      .catch((error) => {
        console.error(
          `Error extragere date despre echipa in functie de ID ${teamId}:`,
          error
        );
      });
  };

  useEffect(() => {
    fetch("http://localhost:5050/api/meci/tip/Liga Zimbrilor")
      .then((response) => response.json())
      .then((data) => {
        const filteredMatches = data.filter(
          (meci) => meci.isFinished === false
        );
        const updatedMatches = filteredMatches.map((meci) => {
          const matchDate = new Date(meci.datameci);
          const options = {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Europe/Bucharest",
          };
          const matchTime = matchDate.toLocaleTimeString("en-EN", options);
          return { ...meci, matchTime };
        });

        setFinishedMatches(updatedMatches);
        updatedMatches.forEach((meci) => {
          fetchTeamDetails(meci.echipaid);
          fetchTeamDetails(meci.adversarid);
        });
      })
      .catch((error) => {
        console.error("Error extragere date:", error);
      });
  }, []);

  const formatDate = (dateString) => {
    const months = [
      "Ianuarie",
      "Februarie",
      "Martie",
      "Aprilie",
      "Mai",
      "Iunie",
      "Iulie",
      "August",
      "Septembrie",
      "Octombrie",
      "Noiembrie",
      "Decembrie",
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div>
      <div className="listaMeciuriViitoareContainer">
        {(showAll ? finishedMatches : finishedMatches.slice(0, 3)).map(
          (meci, index) => (
            <MeciuriViitoare
              key={index}
              etapa={meci.tipcampionat}
              locatia={meci.locatie !== "N/A" ? meci.locatie : "lipsește momentan"}
              data={formatDate(meci.datameci)}
              logoEchipa1={echipaImages[`${meci.echipaid}_logo`]}
              numeEchipa1={echipeDetails[`${meci.echipaid}_nume`]}
              logoEchipa2={echipaImages[`${meci.adversarid}_logo`]}
              numeEchipa2={echipeDetails[`${meci.adversarid}_nume`]}
              ora={meci.matchTime}
            />
          )
        )}

        {finishedMatches.length > 3 && (
          <button onClick={handleShowAll} className="btnShowMore">
            {showAll ? textShowLess : textShowMore}
          </button>
        )}
      </div>
    </div>
  );
};

export default ListaMeciuriViitoare;
