import React from 'react';
import './ListaTrofee.scss';
import Trofee from '../trofee/Trofee'; 
import trofeu1 from "../../assets/juniori/trofee/trofeu.png";

const ListaTrofee = () => {

  const titlu= 'PALMARES';

  const trofeeData = [
    {
      id: 1,
      imagine: trofeu1,
      denumire: 'Denumire trofeu 1',
      numeEchipa: 'Nume Echipa',
      an: 'Anul', 
    },
    {
        id: 2,
        imagine: trofeu1,
        denumire: 'Denumire trofeu 2',
        numeEchipa: 'Nume Echipa',
        an: 'Anul', 
      },
      {
        id: 3,
        imagine: trofeu1,
        denumire: 'Denumire trofeu 1',
        numeEchipa: 'Nume Echipa',
        an: 'Anul', 
      },
      {
          id: 4,
          imagine: trofeu1,
          denumire: 'Denumire trofeu 2',
          numeEchipa: 'Nume Echipa',
          an: 'Anul', 
        },
  ];

  return (
    <div className="palmaresJuniori">
    <div className="titlu-palmaresJuniori">{titlu}</div>
        <div className="container-trofee">
            {trofeeData.map(trofeu => (
                <Trofee
                    key={trofeu.id}
                    imagine={trofeu.imagine}
                    denumire={trofeu.denumire}
                    numeEchipa={trofeu.numeEchipa}
                    an={trofeu.an}
                />
            ))}
        </div>
    
    </div>
  );
};

export default ListaTrofee;




/*  MAP cu  API

import React, { useState, useEffect } from 'react';
import './ListaTrofee.scss';
import Trofee from '../trofee/Trofee'; 

const ListaTrofee = () => {
  const [trofeeData, setTrofeeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://.....');
        if (!response.ok) {
          throw new Error('Network response nu a fost ok.');
        }
        const data = await response.json();
        setTrofeeData(data);
      } catch (error) {
        console.error('A aparut o problema la preluarea datelor:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="palmaresJuniori">
        <div className="titlu-palmaresJuniori">PALMARES</div>
        <div className="container-trofee">
          {trofeeData.map(trofeu => (
            <Trofee
              key={trofeu.id}
              imagine={trofeu.imagine}
              denumire={trofeu.denumire}
              pozitie={trofeu.pozitie}
              an={trofeu.an}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListaTrofee;

*/
