import React, { useState, useEffect } from 'react'
import "./SectiuneClasament.scss";

const TabelClasament = ({ data }) => {
    return (
      <table className='tableClasament'>
        <thead>
          <tr className='trClasament'>
            <th className='thClasament'>Pozitie</th>
            <th className='thClasament'>Echipa</th>
            <th className='thClasament'>Juc</th>
            <th className='thClasament'>V</th>
            <th className='thClasament'>E</th>
            <th className='thClasament'>I</th>
            <th className='thClasament'>GM</th>
            <th className='thClasament'>GP</th>
            <th className='thClasament'>Puncte</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={`trClasament ${item.NumeEchipa === 'CSU din Suceava' ? 'csu-suceava-row' : ''}`}>
              <td className='tdClasament'>{item.Pos}</td>
              <td className='tdClasament'>{item.NumeEchipa}</td>
              <td className='tdClasament'>{item.Meciuri}</td>
              <td className='tdClasament'>{item.Victorii}</td>
              <td className='tdClasament'>{item.Egaluri}</td>
              <td className='tdClasament'>{item.Infrangeri}</td>
              <td className='tdClasament'>{item.GoluriMarcate}</td>
              <td className='tdClasament'>{item.GoluriPrimite}</td>
              <td className='tdClasament'>{item.Puncte}</td>
            </tr>
          ))}
        </tbody>
      </table>

    );
  };

const SectiuneClasament = ({data}) => {

  const textSectiuneClasament ={
    clasament: 'Clasament',
    subtitlu: 'Handbal masculin'
  }

    const [dateExemplu, setPlayersData] = useState([]);

    useEffect(() => {
      fetch('http://localhost:5050/api/clasament')
        .then(response => response.json())
        .then(data => {
          const csuSuceavaIndex = data.findIndex(team => team.NumeEchipa === 'CSU din Suceava');
    
          if (csuSuceavaIndex !== -1) {
            const startSliceIndex = Math.max(0, csuSuceavaIndex - 2);
            const endSliceIndex = Math.min(data.length, csuSuceavaIndex + 3);
            const slicedTeams = data.slice(startSliceIndex, endSliceIndex);
            setPlayersData(slicedTeams);
          }
        })
        .catch(error => {
          console.error('A apărut o eroare:', error);
        });
    }, []);

    return (
        <div className="clasament">
            <div className="title-container">
                <p className="ultimul-meci">{textSectiuneClasament.clasament}</p>
                <p className="liga-text">{textSectiuneClasament.subtitlu}</p>
            </div>
        <div className="clasament-echipe">
          <TabelClasament data={dateExemplu} />
        </div> 
    </div>
  )
}

export default SectiuneClasament
