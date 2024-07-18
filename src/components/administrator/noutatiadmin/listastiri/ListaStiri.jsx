import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ListaCardStiri from '../../../noutati/listacardstiri/ListaCardStiri';

const ListaStiri = ({ onNewsSelect }) => {
  const options = [
    { value: 'Ieri', label: 'Ieri' },
    { value: 'Ultimele 7 zile', label: 'Ultimele 7 zile' },
    { value: 'Ultimele luna', label: 'Ultimele luna' },
    { value: 'Ultimul an', label: 'Ultimul an' },
    { value: 'Calendar', label: 'Calendar' },
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStire, setSelectedStire] = useState(null);

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (selectedOption && selectedOption.value === 'Calendar') {
      setSelectedDate(new Date());
    } else {
      setSelectedDate(null);
    }
  };

  const handleCardClick = (stire) => {
    setSelectedStire(stire);
    onNewsSelect(stire);
  };

  return (
    <div>
      <div className="calendarstire">
        <Select
          value={selectedOption}
          options={options}
          onChange={handleOptionChange}
          placeholder="Selecteza data"
        />

        {selectedOption && selectedOption.value === 'Calendar' && (
          <DatePicker
            className='stire-Dropdown'
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)} 
          />
        )}
      </div>
      
      <div className="separatorListaStiri"></div>
      <div className='carduri-lista-stiri'>
        <ListaCardStiri
          selectedOption={selectedOption}
          selectedDate={selectedDate}
          onCardClick={handleCardClick}
        />
      </div>
    </div>
  );
};

export default ListaStiri;