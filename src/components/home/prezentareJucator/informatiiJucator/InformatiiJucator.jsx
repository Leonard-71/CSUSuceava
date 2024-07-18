import React from "react";
import "./InformatiiJucator.scss";

const InformatiiJucator = ({ playerDetails }) => {
  const textInformatiiJucator = {
    nationalitate: "Naționalitate: ",
    dataNasterii: "Data nașterii: ",
    inaltime: "Înălțime: ",
    numar: "Număr: ",
    varsta: "Vârsta: ",
    descriere: "Descriere: ",
    unitateMasura: "cm",
  };

  if (!playerDetails) return null;

  const dataFormatata = (dateString) => {
    const data = new Date(dateString);
    const zi = data.getDate().toString().padStart(2, "0");
    const luna = (data.getMonth() + 1).toString().padStart(2, "0");
    const an = data.getFullYear();
    return `${zi}.${luna}.${an}`;
  };

  const calculVarsta = (birthDate) => {
    const dataCurenta = new Date();
    const dataNastereJucator = new Date(birthDate);

    let varsta = dataCurenta.getFullYear() - dataNastereJucator.getFullYear();
    const diferentaLuni =
      dataCurenta.getMonth() - dataNastereJucator.getMonth();
    if (
      diferentaLuni < 0 ||
      (diferentaLuni === 0 &&
        dataCurenta.getDate() < dataNastereJucator.getDate())
    ) {
      varsta--;
    }
    return varsta;
  };

  return (
    <div className="informatiiJuc">
      <h2>
        <span className="nume">{playerDetails.nume}</span>{" "}
        <span className="prenume">{playerDetails.prenume}</span>
      </h2>
      <p>
        {" "}
        {textInformatiiJucator.nationalitate}{" "}
        {playerDetails.nationalitate !== null
          ? playerDetails.nationalitate.toLowerCase()
          : "lipsește"}
      </p>
      <p>
        {textInformatiiJucator.dataNasterii}{" "}
        {dataFormatata(playerDetails.dataNasterii) === "11.11.1111"
          ? "lipsește"
          : dataFormatata(playerDetails.dataNasterii)}
      </p>
      <p>
        {textInformatiiJucator.inaltime}{" "}
        {playerDetails.inaltime === 0
          ? "lipsește"
          : `${playerDetails.inaltime} ${textInformatiiJucator.unitateMasura}`}
      </p>
      <p>
        {textInformatiiJucator.numar}{" "}
        {playerDetails.numar === 0 ? "lipsește" : playerDetails.numar}{" "}
      </p>
      <p>
        {textInformatiiJucator.varsta}{" "}
        {dataFormatata(playerDetails.dataNasterii) === "11.11.1111"
          ? "lipsește"
          : calculVarsta(playerDetails.dataNasterii)}
      </p>
      <p
        className={
          playerDetails.descriere && playerDetails.descriere.length > 50
            ? "descriere-lunga"
            : ""
        }
      >
        {textInformatiiJucator.descriere}{" "}
        {playerDetails.descriere === null
          ? "lipsește"
          : playerDetails.descriere}
      </p>
    </div>
  );
};

export default InformatiiJucator;
