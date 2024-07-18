import React, { useState, useEffect } from "react";
import "./SliderEchipa.scss";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";

const SliderEchipa = ({ slides, onPlayerSelect }) => {
  const [currentPozitie, setCurrentPozitie] = useState("extrema-dreapta");

  const pozitii = {
    portar: "P",
    pivot: "Pi",
    centru: "C",
    "inter-stanga": "IS",
    "inter-dreapta": "ID",
    "extrema-stanga": "ES",
    "extrema-dreapta": "ED",
  };

  useEffect(() => {
    const ultimaPozitie = Object.keys(pozitii).pop();
    setCurrentPozitie(ultimaPozitie);
  }, []);

  const slideLeft = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 295;
  };

  const slideRight = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 295;
  };

  const handlePlayerClick = (player) => {
    if (player) {
      console.log("ID jucator:", player.jucatorID);
      onPlayerSelect(player.jucatorID);
    }
  };

  const getTextPozitie = (pozitie) => {
    const pozitieNoua = pozitie
      .toLowerCase()
      .replace(/ă/g, "a")
      .replace(/â/g, "a")
      .replace(/ /g, "-");
    return pozitii[pozitieNoua];
  };

  const handleDropdownChange = (event) => {
    setCurrentPozitie(event.target.value);
  };

  return (
    <div id="main-slider-container">
      <MdChevronLeft
        size={35}
        className="slider-icon left"
        onClick={slideLeft}
      />
      <div id="slider">
        {slides.map((player, index) => (
          <Link
            to={`/prezentareJucator/${player.jucatorID}`}
            key={index}
            className="slider-card-link"
          >
            <div
              className="slider-card"
              key={index}
              onClick={() => handlePlayerClick(player)}
            >
              <div
                className="imagineJucator"
                style={{
                  backgroundImage: `url(${
                    player.imagine
                      ? `data:image/png;base64,${player.imagine}`
                      : require("../../assets/jucatorImagine.jpg")
                  })`,
                  backgroundSize: "cover",
                }}
              ></div>
              <div className="numeJucator">
                <p className="nume">{player.nume}</p>
                <p className="prenume">{player.prenume}</p>
              </div>

              <p className="pozitie">{getTextPozitie(player.pozitie)}</p>
            </div>
          </Link>
        ))}
      </div>
      <MdChevronRight
        size={35}
        className="slider-icon right"
        onClick={slideRight}
      />
    </div>
  );
};

export default SliderEchipa;
