import React from "react";
import "./CardNumeStiri.scss";

const CardNumeStiri = ({ data, titluStire }) => {
  const dateObject = new Date(data);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();

  const formattedDate = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month} ${year}`;

  return (
    <div className="cardStire">
      <div className="sectiuneData">{formattedDate}</div>
      <div className="sectiuneSeparatorStire1"></div>
      <div className="sectiuneTitlu">{titluStire}</div>
    </div>
  );
};

export default CardNumeStiri;
