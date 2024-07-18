import React from "react";
import "./CardLotEchipe.scss";

import junioriUnu from "../../assets/juniori/imagini-lot-echipe/juniori1-transparent.png";
import junioriDoi from "../../assets/juniori/imagini-lot-echipe/juniori2-transparent.png";
import junioriTrei from "../../assets/juniori/imagini-lot-echipe/juniori3-transparent.png";
import tineret from "../../assets/juniori/imagini-lot-echipe/tineret-transparent.png";
import juniori2024 from "../../assets/juniori/imagini-lot-echipe/juniori2024.png";

const CardLotEchipe = () => {
  const echipe = [
    {
      nume: "JUNIORI I (2023)",
      imagine: junioriUnu,
      ruta: "/detalii-echipa/0",
      termen: "Juniori 1",
    },
    {
      nume: "JUNIORI II (2023)",
      imagine: junioriDoi,
      ruta: "/detalii-echipa/1",
      termen: "Juniori 2"
    },
    {
      nume: "JUNIORI III (2023)",
      imagine: junioriTrei,
      ruta: "/detalii-echipa/2",
      termen: "Juniori 3"
    },
    {
      nume: "TINERET (2023)",
      imagine: tineret,
      ruta: "/detalii-echipa/3",
      termen: "Tineret"
    },

    {
      nume: "JUNIORI (2024)",
      imagine: juniori2024,
      ruta: "/detalii-echipa/4",
      termen: "Juniori 2024"
    },
  ];
  const link='Vezi echipa →';

  const handleCardClick = (termen) => {
    window.location.href = `/lista-juniori/${termen}`;
    console.log("CardEchipe: " + termen);
  };

  return (
    <div className="container-lot-echipe">
      {echipe.map((echipa, index) => (
        <div
          className="card-lot-echipa"
          key={index}
          onClick={() => handleCardClick(echipa.termen)}
        >
          <img src={echipa.imagine} alt={"Imagine " + echipa.nume} />
          <div className="descriere-lot-echipa">
            <h3>{echipa.nume}</h3>
            <h5>{link}</h5>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardLotEchipe;

