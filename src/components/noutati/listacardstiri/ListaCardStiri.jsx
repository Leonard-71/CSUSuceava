import React, { useState, useEffect } from 'react';
import CardNumeStiri from './cardnumestiri/CardNumeStiri';
import './ListaCardStiri.scss';

const ListaCardStiri = ({ selectedOption, selectedDate, onCardClick }) => {
  const initialDisplayCount = 3;
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);
  const [stiri, setStiri] = useState([]);

  useEffect(() => {
    fetchData();
  }, [selectedOption, selectedDate]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5050/api/stire`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      const formattedStiri = data.map((stire) => ({
        ...stire,
        datapublicarii: formatDate(stire.datapublicarii),
      }));

      setStiri(formattedStiri);
    } catch (error) {
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' }); 
    const year = date.getFullYear();
  
    return `${day} ${month} ${year}`;
  };
  

  const sortedListStiri = stiri.sort((a, b) => new Date(b.datapublicarii) - new Date(a.datapublicarii));

  const filteredStiri = selectedOption
    ? (selectedOption.value === 'Calendar' && selectedDate)
      ? sortedListStiri.filter((stire) => new Date(stire.datapublicarii).toDateString() === selectedDate.toDateString())
      : sortedListStiri.filter((stire) => {
        const currentDate = new Date();
        switch (selectedOption.value) {
          case 'Ieri':
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            return new Date(stire.datapublicarii).toDateString() === yesterday.toDateString();
          case 'Ultimele 7 zile':
            return new Date(stire.datapublicarii) >= currentDate.setDate(currentDate.getDate() - 7);
          case 'Ultimele luna':
            return new Date(stire.datapublicarii) >= currentDate.setMonth(currentDate.getMonth() - 1);
          case 'Ultimul an':
            return new Date(stire.datapublicarii) >= currentDate.setFullYear(currentDate.getFullYear() - 1);
          case 'Calendar':
            return new Date(stire.datapublicarii) === selectedDate;
          default:
            return true;
        }
      })
    : sortedListStiri;

  const visibleStiri = filteredStiri.slice(0, displayCount);

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 7);
  };
  const puncte='...';

  return (
    <div className="listaCarduri-stiri">
      {visibleStiri.length > 0 ? (
        visibleStiri.map((stire, index) => (
          <div
            key={index}
            onClick={() => onCardClick(stire)}
            className="cardClickable" 
          >
            <CardNumeStiri
              titluStire={stire.titlu.substring(0, 50) + puncte}
              data={stire.datapublicarii}
            />
          </div>
        ))
      ) : (
        <div className="mesaj-eroare">Nu există știri pentru perioada selectată.</div>
      )}
      {displayCount < sortedListStiri.length ? (
        <div className="sageata-in-jos" onClick={handleLoadMore}>
          &#9660;
        </div>
      ) : (
        <div className="sageata-in-sus" onClick={() => setDisplayCount(initialDisplayCount)}>
          &#9650;
        </div>
      )}
    </div>
  );
};

export default ListaCardStiri;
