import React, { useState, useEffect } from 'react';
import './Despre.scss';
import image1 from '../assets/img1.png';
import image2 from '../assets/img2.png';
import image3 from '../assets/img3.png';
import TimeLine from '../despre/timeline/TimeLine';

const Despre = () => {
  const textDespre = {
    titluDespre: 'Despre CSU Suceava',
    titluViziune: 'Viziune',
    titluIstoric: 'Istoric',
    titluTrofee: 'Trofee',
    descriereViziune:
      'Una dintre prioritățile clubului nostru rămâne depistarea și formarea copiilor cu cele mai bune calități pentru practicarea handbalului de mare performanță. Scopul principal al CLUBULUI SPORTIV UNIVERSITATEA SUCEAVA este de a organiza şi desfăşura activităţi sportive de performanţă şi de masă cu studenţii, cadrele didactice şi alte categorii de personal din Universitatea “Ştefan cel Mare” Suceava, precum şi cu alte categorii de cetăţeni care respectă statutul clubului.',
    descriereIstoric:
      'CSU Suceava se remarcă în fiecare an prin performanțe deosebite la toate categoriile de vârstă. În sezonul 2022-2023 ne-am reconfirmat statutul de cel mai puternic centru de copii și juniori din handbalul masculin românesc, prin câștigarea campionatelor naționale de juniori I și juniori II. De altfel, handbaliștii suceveni sunt majoritari în loturile naționale de tineret și juniori ale României.',
  };

  const [trofee, setTrofee] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5050/api/trofee?echipaId=1')
      .then((response) => response.json())
      .then((data) => {
        setTrofee(data);
      })
      .catch((error) => {
        console.error('A apărut o eroare:', error);
      });
  }, []);

  return (
    <div className="despre">
      <div className="titlu">
        <h3>{textDespre.titluDespre}</h3>
        <div className="image-container">
          <img className="image" src={image1} alt="Imagine1" />
          <img className="image" src={image2} alt="Imagine2" />
          <img className="image" src={image3} alt="Imagine3" />
        </div>
      </div>

      <div className="viziune">
        <h3>{textDespre.titluViziune}</h3>
        <h5>{textDespre.descriereViziune}</h5>
      </div>

      <div className="istoric">
        <h2>{textDespre.titluIstoric}</h2>
      </div>
      <div className="viziuneText">{textDespre.descriereIstoric}</div>
      <TimeLine />
      <div className="trofee">
        <h3>{textDespre.titluTrofee}</h3>
      </div>
      <div className="palmares">
        {trofee.map((trofeu) => (
          <div className="coluna" key={trofeu.id}>
            <div className="card">
              <div className="year">
                {trofeu.an} | {trofeu.nume}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Despre;
