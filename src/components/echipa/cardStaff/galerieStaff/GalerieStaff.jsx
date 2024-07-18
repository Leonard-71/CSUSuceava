import React, { useEffect, useState } from 'react';
import CardAntrenor from '../cardAntrenor/CardAntrenor';
import CardEchipaStaff from '../cardEchipaStaff/CardEchipaStaff';

import './GalerieStaff.scss';

const GalerieStaff = ({ editieSelectata, onSelectEditie }) => {
  const [antrenoriFiltrati, setAntrenoriFiltrati] = useState([]);
  const [membriEchipa, setMembriEchipa] = useState([]);

  const numeEchipa = 'CSU Suceava';
  const categorie = 'Staff';


  const textGalerieStaff ={
    titlu: 'STAFF TEHNIC',
    mesajEroare: 'Nu există date despre echipa staff pentru anul selectat.'
  }

  useEffect(() => {
    if (editieSelectata !== '') {
      fetch(`http://localhost:5050/api/jucator/echipa/${numeEchipa}/editia/${editieSelectata}/categoria/${categorie}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          const sortedAntrenori = data.sort((a, b) => {
            if (a.pozitie === 'Antrenor principal' && b.pozitie !== 'Antrenor principal') {
              return -1;
            } else if (a.pozitie !== 'Antrenor principal' && b.pozitie === 'Antrenor principal') {
              return 1;
            } else {
              return 0;
            }
          });
          const antrenoriFiltrati = sortedAntrenori.filter(persoana => {
            return persoana.pozitie && persoana.pozitie.toLowerCase().includes('antrenor');
          });

          setAntrenoriFiltrati(antrenoriFiltrati);
          const membriEchipaFiltrati = data.filter(persoana => {
            return !(persoana.pozitie && persoana.pozitie.toLowerCase().includes('antrenor'));
          });
          setMembriEchipa(membriEchipaFiltrati);
        })
        .catch(error => {
          console.error('A apărut o eroare:', error);
        });
    }
  }, [editieSelectata, onSelectEditie]);

  return (
    <>
      <div className="titluStaff">{textGalerieStaff.titlu}</div>
      <div className="galerie-carduri">
        {membriEchipa.length === 0 && antrenoriFiltrati.length === 0 ? (
          <div className="mesaj-nodate">{textGalerieStaff.mesajEroare}</div>
        ) : (
          <div className="card-container">
            {antrenoriFiltrati.map((antrenor, index) => (
              <div className="card-antrenor" key={index}>
                <CardAntrenor key={index} imagineBase64={antrenor.imagineBase64} {...antrenor} />
              </div>
            ))}
            <div className="carduri-staff">
              {membriEchipa.map((membru, index) => (
                <div className="card-staff" key={index}>
                  <CardEchipaStaff key={index} imagineBase64={membru.imagineBase64} {...membru} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GalerieStaff;
