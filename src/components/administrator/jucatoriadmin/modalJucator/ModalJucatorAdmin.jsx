import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ModalJucatorAdmin.scss";

const ModalJucatorAdmin = ({ isOpen, closeModal, jucatorId }) => {
  const [jucatorData, setJucatorData] = useState({
    nume: "",
    prenume: "",
    dataNasterii: null,
    nationalitate: "",
    descriere: "",
    inaltime: "",
    numar: "",
    pozitie: "",
    imagine: "",
  });
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const textModalJucatorAdmin = {
    textButonSalveaza: "Salveaza datele",
    textIncarcaImagine: "Incarca imagine ",
    textNume: "NUME:",
    textPrenume: "PRENUME:",
    textDataNasterii: "DATA NASTERII:",
    textNationalitate: "NATIONALITATE:",
    textDescriere: "DESCRIERE:",
    textInaltime: "INALTIME(cm):",
    textNumar: "NUMAR:",
    textPozitie: "POZITIE:",
    textEditeazaJucator: "EDITEAZĂ JUCĂTORUL",
    textLipsaImagine: "Nicio imagine",
  };

  useEffect(() => {
    const fetchData = async () => {
      if (jucatorId) {
        try {
          const response = await fetch(
            `http://localhost:5050/api/jucator/${jucatorId}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          const data = await response.json();
          setJucatorData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen, jucatorId]);

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Result = reader.result;
        setUploadedImage(base64Result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  
    try {
      const requestData = {
        ...jucatorData,
        imagine: uploadedImage ? uploadedImage.split(",")[1] : jucatorData.imagine,
      };
  
      if (!jucatorId) {
        const response = await fetch("http://localhost:5050/api/jucator", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
      } else {
        const response = await fetch(`http://localhost:5050/api/jucator/${jucatorId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
      }
  
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error("Error saving data:", error);
      console.log("PUT/POST: " + jucatorId);
    }
  };
  

  const pozitiiJucator = [
    "Portar",
    "Pivot",
    "Centru",
    "Inter Dreapta",
    "Inter Stânga",
    "Extremă Stânga",
    "Extremă Dreapta",
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Modal"
      className="modal-jucator-admin"
      overlayClassName="ReactModal__Overlay"
    >
      <button className="close-button" onClick={closeModal}>
        X
      </button>
  
      {jucatorData && (
        <div className="modal-content">
          <div className="left-column">
            <div>
              <h3>{textModalJucatorAdmin.textEditeazaJucator}</h3>
              {uploadedImage ? (
                <img src={uploadedImage} alt="Jucator" />
              ) : jucatorData.imagine ? (
                <img
                  src={`data:image/jpeg;base64,${jucatorData.imagine}`}
                  alt="Jucator"
                />
              ) : (
                <p>{textModalJucatorAdmin.textLipsaImagine}</p>
              )}
  
              <div>
                <label className="button-incarca-imagine">
                  {textModalJucatorAdmin.textIncarcaImagine}
                  <input type="file" onChange={handleImageUpload} />
                </label>
              </div>
            </div>
          </div>
          <div className="right-column">
            <div>
              <label>
                {textModalJucatorAdmin.textNume}
                <input
                  type="text"
                  value={jucatorData.nume || ""}
                  onChange={(e) =>
                    setJucatorData({ ...jucatorData, nume: e.target.value })
                  }
                />
              </label>
            </div>
            <div>
              <label>
                {textModalJucatorAdmin.textPrenume}
                <input
                  type="text"
                  value={jucatorData.prenume || ""}
                  onChange={(e) =>
                    setJucatorData({
                      ...jucatorData,
                      prenume: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div>
              <label>
                {textModalJucatorAdmin.textDataNasterii}
                <DatePicker
                  selected={
                    jucatorData.dataNasterii
                      ? new Date(jucatorData.dataNasterii)
                      : null
                  }
                  onChange={(date) =>
                    setJucatorData({ ...jucatorData, dataNasterii: date })
                  }
                />
              </label>
            </div>
            <div>
              <label>
                {textModalJucatorAdmin.textNationalitate}
                <input
                  type="text"
                  value={jucatorData.nationalitate || ""}
                  onChange={(e) => {
                    console.log("Nationalitate changed:", e.target.value);
                    setJucatorData({
                      ...jucatorData,
                      nationalitate: e.target.value,
                    });
                  }}
                />
              </label>
            </div>
            <div>
              <label>
                {textModalJucatorAdmin.textDescriere}
                <input
                  type="text"
                  value={jucatorData.descriere || ""}
                  onChange={(e) =>
                    setJucatorData({
                      ...jucatorData,
                      descriere: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div>
              <label>
                {textModalJucatorAdmin.textInaltime}
                <input
                  type="text"
                  value={jucatorData.inaltime || ""}
                  onChange={(e) =>
                    setJucatorData({ ...jucatorData, inaltime: e.target.value })
                  }
                />
              </label>
            </div>
            <div>
              <label>
                {textModalJucatorAdmin.textNumar}
                <input
                  type="text"
                  value={jucatorData.numar || ""}
                  onChange={(e) =>
                    setJucatorData({ ...jucatorData, numar: e.target.value })
                  }
                />
              </label>
            </div>
            <div>
              <label>
                {textModalJucatorAdmin.textPozitie}
                <select
                  className="select-pozitie-jucator"
                  value={jucatorData.pozitie || ""}
                  onChange={(e) =>
                    setJucatorData({ ...jucatorData, pozitie: e.target.value })
                  }
                >
                  <option value="">Selectează poziția</option>
                  {pozitiiJucator.map((pozitie, index) => (
                    <option key={index} value={pozitie}>
                      {pozitie}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button onClick={handleSave}>
              {textModalJucatorAdmin.textButonSalveaza}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
  
};

export default ModalJucatorAdmin;
