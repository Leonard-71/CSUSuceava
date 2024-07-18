import React, { useEffect, useState, useRef } from "react";
import "./ListaCarduriJuniori.scss";
import CardJunior from "../cardJunior/CardJunior";
import { useParams } from "react-router-dom";
import back from "../../assets/juniori/back.png";
import up from "../../assets/juniori/up.png";

const ListaCarduriJuniori = () => {
  const textListaJuniori = {
    lot: "LOT",
    seIncarca: "Loading...",
  };

  const { termen } = useParams();
  const [membriEchipaJuniori, setMembriEchipaJuniori] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canScroll, setCanScroll] = useState(false);

  const containerEchipeRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5050/api/jucator/echipa/CSU Suceava/editia/2023/categoria/${termen}`
      );
      const data = await response.json();
      setMembriEchipaJuniori(data);
      setLoading(false);
    } catch (error) {
      console.error("Eroare:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      const isScrollable =
        document.documentElement.scrollHeight >
        window.innerHeight + document.documentElement.scrollTop;
      setCanScroll(isScrollable);
    };

    checkScroll();

    const handleScroll = () => {
      checkScroll();
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollBackToTop = () => {
    window.location.href = "/juniori";
  };

  if (loading) {
    return <div>{textListaJuniori.seIncarca}</div>;
  }

  return (
    <div className="container-juniori">
      <div className="container-titlu-juniori">
        <button onClick={scrollBackToTop}>
          <img src={back} alt="back" />
        </button>
        <div className="titlu-juniori">{textListaJuniori.lot}</div>
        <div className="titlu-juniori">{termen}</div>
      </div>

      <div className="galerie-juniori" ref={containerEchipeRef}>
        <div className="carduri-juniori">
          {membriEchipaJuniori.map((membru, index) => (
            <div className="card-juniori" key={index}>
              <CardJunior
                key={index}
                imagineBase64={membru.imagineBase64}
                {...membru}
              />
            </div>
          ))}
        </div>
        {canScroll && (
          <button className="toTop" onClick={scrollToTop}>
            <img src={up} alt="up" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ListaCarduriJuniori;
