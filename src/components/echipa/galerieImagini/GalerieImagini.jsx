import React from 'react';
import './GalerieImagini.scss'; // Asigură-te că ai fișierul pentru stiluri


import pic1 from "../../assets/containerEchipa/galerieEchipa1.jpg";
import pic2 from "../../assets/containerEchipa/galerieEchipa2.jpg";
import pic3 from "../../assets/containerEchipa/galerieEchipa3.jpg";
import pic4 from "../../assets/containerEchipa/antrenor.jpg";

  const GalerieImagini = ({ images }) => {
    return (
        <div className="cunoasteEchipa">
          <div className="imgContainer">
          <div className="leftside">
            <img src={pic1} alt="Picture of player" className="image image1"  />
          </div>
          <div className="rigthside">
            <div className="uppperside">
              <img
                src={pic2}
                alt="Picture of player"
                className="image image2"
                
              />
            </div>
            <div className="bottomside">
              <div className="left">
                {" "}
                <img
                  src={pic3}
                  alt="Picture of player"
                  className="image image3"
                  
                />
              </div>
              <div className="right">
                {" "}
                <img
                  src={pic4}
                  alt="Picture of player"
                  className="image image4"
                  
                />
              </div>
            </div>
          </div>
          </div>
      </div>
    );
  };
  
  export default GalerieImagini;
