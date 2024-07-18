import React, { useState } from 'react';
import './Noutati.scss';
import Stire from './stire/Stire';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import ListaCardStiri from './listacardstiri/ListaCardStiri';
import SliderNoutati from './sliderNoutati/SliderNoutati';

const Noutati = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStire, setSelectedStire] = useState(null);

  const options = [
    { value: 'Ieri', label: 'Ieri' },
    { value: 'Ultimele 7 zile', label: 'Ultimele 7 zile' },
    { value: 'Ultimele luna', label: 'Ultimele luna' },
    { value: 'Ultimul an', label: 'Ultimul an' },
    { value: 'Calendar', label: 'Calendar' },
  ];

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
  };

  return (
    <div>
        <div className="container-stiri-slider">
         <SliderNoutati/>
        </div>

      <div className="container-stiri">
        <div className="coloanastanga">
          {selectedStire && (
            <Stire
              titlu={selectedStire.titlu}
              descriere={selectedStire.continut}
              imagine={`data:image/jpeg;base64,${selectedStire.imagine1}`}
            />
          )}
        </div>

        <div className="coloanadreapta ">
          <div className="calendarstire">
            <Select
              value={selectedOption}
              options={options}
              onChange={handleOptionChange}
              placeholder="Selecteza data"
            />

            {selectedOption && selectedOption.value === 'Calendar' && (
              <DatePicker className='stire-Dropdown' selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
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
      </div>
      
    </div>
  );
};

export default Noutati;
