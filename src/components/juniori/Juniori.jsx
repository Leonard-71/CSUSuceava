import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import './Juniori.scss';

import IntroJuniori from "./introJuniori/IntroJuniori";
import CardLotEchipe from './cardLotEchipe/CardLotEchipe'
import ListaTrofee from "../juniori/listaTrofee/ListaTrofee";

const Juniori = () => {
  const titluEchipe = 'ECHIPE';

  const containerEchipeRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const scrollToContainerEchipe = searchParams.get("scrollToContainerEchipe");
    if (scrollToContainerEchipe === "true") {
      const element = containerEchipeRef.current;
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.search]);

  return (
    <div className="container-juniori">
      <IntroJuniori/>
      <div className="container-echipe" id="container-echipe" ref={containerEchipeRef}>
        <div className="nume-echipe">{titluEchipe}</div>
        <div className="container-lot-echipe">
          <CardLotEchipe />
        </div>
      </div>
      <ListaTrofee/>
    </div>
  );
};

export default Juniori;
