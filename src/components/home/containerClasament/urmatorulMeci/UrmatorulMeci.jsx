import React, { useState, useEffect } from "react";
import "./UrmatorulMeci.scss";
import logo from "../../../assets/logoLiga.png";

const UrmatorulMeci = () => {
  const textUrmatorulMeci = {
    titlu: "Următorul meci",
    subtitlu: "Handbal masculin",
    descriereLink: "Vezi LIVE",
  };

  const [formattedDate, setFormattedDate] = useState("");
  const [formattedTime, setFormattedTime] = useState("");
  const [homeTeamName, setHomeTeamName] = useState("");
  const [awayTeamName, setAwayTeamName] = useState("");

  const formatRomanianDate = (dateTime) => {
    return dateTime.toLocaleDateString("ro-RO");
  };

  const formatRomanianTime = (dateTime) => {
    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    async function fetchMeciViitor() {
      try {
        const response = await fetch(
          "http://localhost:5050/api/meci/meciviitor"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data && data.datameci) {
          const dateTime = new Date(data.datameci);
          const formattedDateTime = new Date(
            dateTime.toLocaleString("en-US", { timeZone: "Europe/Bucharest" })
          );
          const formattedDate = formatRomanianDate(formattedDateTime);
          const formattedTime = formatRomanianTime(formattedDateTime);

          setFormattedDate(formattedDate);
          setFormattedTime(formattedTime);

          setFormattedDate(formattedDate);
          setFormattedTime(formattedTime);

          const homeTeamResponse = await fetch(
            `http://localhost:5050/api/echipa/${data.echipaid}`
          );
          if (homeTeamResponse.ok) {
            const homeTeamData = await homeTeamResponse.json();
            setHomeTeamName(homeTeamData.nume);
          }

          const awayTeamResponse = await fetch(
            `http://localhost:5050/api/echipa/${data.adversarid}`
          );
          if (awayTeamResponse.ok) {
            const awayTeamData = await awayTeamResponse.json();
            setAwayTeamName(awayTeamData.nume);
          }
        }
      } catch (error) {
        console.error("There was a problem fetching the data:", error);
      }
    }

    fetchMeciViitor();
  }, []);

  return (
    <div className="meci-urmator">
      <div className="title-container">
        <p className="ultimul-meci">{textUrmatorulMeci.titlu}</p>
        <p className="liga-text">{textUrmatorulMeci.subtitlu}</p>
      </div>

      <div className="data-container">
        <div className="header-data">
          <img className="logo-liga" src={logo} alt="" />
          <p className="data-meci">{formattedDate}</p>
        </div>

        <div className="middle-data">
          <div className="echipe">
            <div className="echipaAcasa">
              <p className="nume-echipa">{homeTeamName}</p>
            </div>

            <div className="echipaDeplasare">
              <p className="nume-echipa">{awayTeamName}</p>
            </div>
          </div>

          <p className="ora-meci"> {formattedTime}</p>
        </div>

        <div className="bottom-data">
          <p className="meci-live">
            <a
              href="https://www.youtube.com/@CSUSuceava"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              {textUrmatorulMeci.descriereLink}{" "}
              <span className="arrow">&#x2192;</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UrmatorulMeci;
