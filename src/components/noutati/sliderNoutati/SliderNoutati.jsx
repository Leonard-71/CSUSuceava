import ScrollCarousel from "scroll-carousel-react";
import React, { useState, useEffect } from "react";
import CardStireNews from '../sliderNoutati/cardStireNews/CardStireNews';
import './SliderNoutati.scss';

const SliderNoutati = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/stire");
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error("There was a problem fetching the data:", error);
      }
    };

    fetchData();
  }, []);

  if (newsData.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="containerSlider">
      <ScrollCarousel
        autoplay
        autoplaySpeed={20}
        speed={2}
        onReady={() => console.log("I am ready")}
      >
        {newsData.map((item, index) => (
          <CardStireNews
            key={index}
            titluStire={`${item.titlu}...`}
            data={item.datapublicarii}
            descriere={item.continut}
            imagine={item.imagine1}
          />
        ))}
      </ScrollCarousel>
    </div>
  );
};

export default SliderNoutati;
