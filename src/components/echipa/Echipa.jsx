import React, { useState, useEffect } from 'react';
import "./Echipa.scss";
import GalerieStaff from './cardStaff/galerieStaff/GalerieStaff';
import LotJucatori from './lotJucatori/LotJucatori';
import GalerieImagini from './galerieImagini/GalerieImagini';

const Echipa = () => {
  const [editiiEchipa, setEditiiEchipa] = useState([]);
  const [editieSelectata, setEditieSelectata] = useState('');
  const numeEchipa = 'CSU Suceava';
  const categorieStaff = 'Staff';
  /*const categorieJucatori = 'Adulti';*/

  useEffect(() => {
    fetchEditii(categorieStaff, setEditiiEchipa, setEditieSelectata);
  }, []);

  const fetchEditii = (categorie, setEditii, setEditieSelectata) => {
    fetch(`http://localhost:5050/api/echipa/nume/${numeEchipa}/categorie/${categorie}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setEditii(data.map(item => item.editia));
        const currentYear = new Date().getFullYear().toString();
        const editieCurenta = data.find(item => item.editia === currentYear);
        if (editieCurenta) {
          setEditieSelectata(editieCurenta.editia);
        } else if (data.length > 0) {
          setEditieSelectata(data[data.length - 1].editia);
        }
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };

  const handleEditieSelectata = (editie) => {
    setEditieSelectata(editie);
  };

  return (
    <div className="echipa">
      <GalerieImagini />

      <select onChange={(event) => handleEditieSelectata(event.target.value)} value={editieSelectata} className='dropdownPgEchipa'>
        {editiiEchipa.map(editie => (
          <option key={editie} value={editie}>
            Ediția: {editie}
          </option>
        ))}
      </select>

      <LotJucatori editieSelectata={editieSelectata} onSelectEditie={handleEditieSelectata} />
      <GalerieStaff editieSelectata={editieSelectata} onSelectEditie={handleEditieSelectata} />
    </div>
  );
};

export default Echipa;
