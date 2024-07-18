import React from "react";
import "./CardStireFiltru.scss";

const CardStireFiltru = () => {
    
    const textCardStireFiltru ={
        data: '10.02.2024',
        titluStire:'Acesta este un titlu'
    }

  return (
    <div className="containerStiriFiltrate">
      <div className="cardStire">
            <div className="sectiuneData">{textCardStireFiltru.data}</div>
            <div className="sectiuneSeparator"></div>
            <div className="sectiuneTitlu">{textCardStireFiltru.titluStire}</div>
      </div>
    </div>
  );
};

export default CardStireFiltru;
