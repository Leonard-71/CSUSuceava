import React, { useState, useEffect } from "react";
import "./UrmatorulMeci.scss";

import CountdownTimer from "../countdownTimer/CountdownTimer";

const UrmatorulMeci = () => {
  const textUrmatorulMeci = {
    titlu: "Următorul meci",
    vs: "VS",
    ora: "Ora:",
    separator: "|",
    data: "Data:",
    liga: "Liga Națională de handbal masculin",
    locatia: "Locație:",
    etapaMeciului: "Etapa:",
    loading: "Se incarca...",
    descriereLink: "URMARESTE MECIUL LIVE →",
    lipsaLocatie: " lipsește momentan",
  };

  const [matchData, setMatchData] = useState({});
  const [loading, setLoading] = useState(true);
  const [locatieMeci, setLocatieMeci] = useState("");
  const [editieMeci, setEditieMeci] = useState("");
  const [dataMeci, setDataMeci] = useState("");
  const [oraMeci, setOraMeci] = useState("");
  const [echipaGazda, setEchipaGazda] = useState("");
  const [imagineEchipaGazda, setImagineEchipaGazda] = useState("");
  const [echipaOaspeti, setEchipaOaspeti] = useState("");
  const [imagineEchipaOaspeti, setImagineEchipaOaspeti] = useState("");
  const [showCountdown, setShowCountdown] = useState(true);
  const [showLink, setShowLink] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(
          "http://localhost:5050/api/meci/meciviitor"
        );
        const matchData = await response1.json();
        setMatchData(matchData);

        const { datameci, locatie, editia, echipaid, adversarid } = matchData;
        const dateObj = new Date(datameci);

        const dataFormatata = dateObj.toLocaleString("ro-RO", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        setDataMeci(dataFormatata);

        const oraFormatata = dateObj.toLocaleString("ro-RO", {
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        });
        setOraMeci(oraFormatata);

        setLocatieMeci(locatie);
        setEditieMeci(editia);

        const response2 = await Promise.all([
          fetch(`http://localhost:5050/api/echipa/${echipaid}`),
          fetch(`http://localhost:5050/api/echipa/${adversarid}`),
        ]);

        const [team1Response, team2Response] = response2;
        const team1Data = await team1Response.json();
        const team2Data = await team2Response.json();

        setEchipaGazda(team1Data.nume);
        setImagineEchipaGazda(team1Data.imagine);
        setEchipaOaspeti(team2Data.nume);
        setImagineEchipaOaspeti(team2Data.imagine);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let timer;
    let timeElapsed = 0;
    const updateTime = () => {
      timeElapsed += 1;
      if (timeElapsed >= 120) {
        setShowCountdown(false);
        setShowLink(true);
        clearInterval(timer);
      }
    };
    if (showCountdown) {
      timer = setInterval(updateTime, 1000);
    }
    return () => clearInterval(timer);
  }, [showCountdown]);

  return (
    <div className="imaginePromoMeci">
      {loading ? (
        <div>{textUrmatorulMeci.loading}</div>
      ) : (
        <>
          <h2 className="descriereMeciUrmator">{textUrmatorulMeci.titlu}</h2>
          <div className="anuntMeci">
            <div className="logo-echipe">
              <img
                src={`data:image/png;base64, ${imagineEchipaGazda}`}
                alt="Echipa gazda"
                className="logo1"
              />
              <div className="vs">{textUrmatorulMeci.vs}</div>
              <img
                src={`data:image/png;base64, ${imagineEchipaOaspeti}`}
                alt="Echipa oaspeti"
                className="logo2"
              />
            </div>
            <div className="informatii-meci">
              <div className="info-top">
                <div className="ora-data">
                  {textUrmatorulMeci.ora} {oraMeci}{" "}
                  {textUrmatorulMeci.separator} {textUrmatorulMeci.data}{" "}
                  {dataMeci}
                </div>
              </div>
              <div className="echipe">
                {echipaGazda} - {echipaOaspeti}
              </div>
              <div className="ligaNadionala">{textUrmatorulMeci.liga}</div>
              <div className="etapaMeci">
                {" "}
                {textUrmatorulMeci.etapaMeciului} {editieMeci}
              </div>
              <div className="locatieMeci">
              {textUrmatorulMeci.locatia}
                {locatieMeci !== "N/A"
                  ? locatieMeci
                  : textUrmatorulMeci.lipsaLocatie}
              </div>
            </div>

            <div className="design">
              {showCountdown && (
                <CountdownTimer matchDateTime={matchData.datameci} />
              )}
              {showLink && (
                <a
                  href="https://www.youtube.com/@CSUSuceava"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  {textUrmatorulMeci.descriereLink}
                </a>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UrmatorulMeci;
