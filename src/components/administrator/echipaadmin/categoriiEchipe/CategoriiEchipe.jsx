import React, { useEffect, useState } from 'react';
import './CategoriiEchipe.scss';

const CategoriiEchipe = ({ onChange }) => {
  const [echipe, setEchipe] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const defaultValue = ' echipe';
  const [defaultSelected, setDefaultSelected] = useState(defaultValue);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/echipa');

        if (response.ok) {
          const data = await response.json();
          setEchipe(data);

          const uniqueCategories = [...new Set(data.map(echipa => `${echipa.categorie}-${echipa.editia}`))];
          setSubcategories(uniqueCategories);
        } else {
          console.error('Cererea GET a eșuat');
        }
      } catch (error) {
        console.error('Eroare de rețea:', error);
      }
    };

    fetchData();
  }, []);

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    onChange(selectedValue); 
  };

  const selectedValue = selectedCategory || defaultSelected;

  const categoriiOptions = [
    <option key="default" value={defaultValue} disabled>{defaultValue}</option>,
    ...subcategories.map((subcategory, index) => (
      <option key={index} value={subcategory}>
        {subcategory}
      </option>
    ))
  ];

  return (
    <div>
      <select value={selectedValue} onChange={handleDropdownChange}>
        {categoriiOptions}
      </select>
    </div>
  );
};

export default CategoriiEchipe;
