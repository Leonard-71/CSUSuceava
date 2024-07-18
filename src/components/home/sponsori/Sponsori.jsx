import React, { useState, useEffect } from 'react';
import './Sponsori.scss';

const Sponsori = () => {
  const [sponsorData, setSponsorData] = useState([]);
  const [selectedEdition, setSelectedEdition] = useState('');
  const [editions, setEditions] = useState([]);

  const editieText= 'Editia:';

  useEffect(() => {
    fetch('http://localhost:5050/api/sponsor')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setSponsorData(data);
        const years = data.map((sponsor) => sponsor.editia);
        const uniqueYears = [...new Set(years)];
        const sortedYears = uniqueYears.sort((a, b) => a - b);
        const defaultEdition = sortedYears.length > 0 ? sortedYears[sortedYears.length - 1] : '';
        setSelectedEdition(defaultEdition);
        setEditions(sortedYears);

      })
      .catch((error) => console.error('Eroare în obținerea datelor sponsorilor:', error));
  }, []);
  
  useEffect(() => {
    if (selectedEdition.trim() !== '') {
      fetch(`http://localhost:5050/api/sponsor?editie=${selectedEdition}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => setSponsorData(data))
        .catch((error) => console.error('Eroare în obținerea datelor sponsorilor pentru ediție:', error));
    }
  }, [selectedEdition]);

  const handleLogoClick = (linkSiteExtern) => {
    window.open(linkSiteExtern, '_blank');
  };

  const handleEditionChange = (edition) => {
    setSelectedEdition(edition);
  };

  return (
    <div>
      <div className="dropdown-container">
        <select  className='select-sponsori' value={selectedEdition} onChange={(e) => handleEditionChange(e.target.value)}>
            {editions.map((edition, index) => (
              <option key={index} value={edition}>
                {editieText} {edition}
              </option>
            ))}
        </select>
      </div>

      <div className="logo-list">
        {sponsorData
          .filter((sponsor) => sponsor.editia === selectedEdition)
          .map((sponsor, index) => (
          <div key={index} className="logo-item">
            <img
              src={`data:image/png;base64,${sponsor.Imagine}`}
              alt={sponsor.numeComplet}
              className="logoSponsor"
              onClick={() => handleLogoClick(sponsor.linkSiteExtern)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        ))}
      </div>

    </div>
  );
};

export default Sponsori;
