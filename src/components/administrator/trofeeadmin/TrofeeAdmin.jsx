import React, { useState, useEffect } from "react";
import "./TrofeeAdmin.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const TrofeeAdmin = () => {
  const [trofee, setTrofee] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [editTrofee, setEditTrofee] = useState(null);
  const [showEditSection, setShowEditSection] = useState(false);
  const [filteredTrofee, setFilteredTrofee] = useState([]);
  const [echipaFilter, setEchipaFilter] = useState("all");

  const textTrofeeAdmin = {
    textNume: "Nume",
    textAn: "Anul",
    textAdaugaTrofeu: "Adaugă trofeu",
    textTitluTrofeeAdmin: "Trofee",
    textSponsorId: "Trofee ID",
    textEditareNume: "NUME:",
    textEditareAn: "AN:",
    textEditareEchipa: "ECHIPA:",
    textActiuni: "Actiuni",
    textIncarcaImagine: "Încarcă imagine",
    textBtnSalveaza: "Salvează",
    textLipsaImagine: "Nicio imagine încărcată pentru trofeu",
    textPlaceholderNume: "Introduceți numele aici",
    textPlaceholderAn: "Introduceți anul aici",
    textPlaceholderEchipa: "Introduceți id echipa aici",
  };

  useEffect(() => {
    const fetchTrofee = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/trofee");
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setTrofee(data);
        setFilteredTrofee(data);
      } catch (error) {
        console.error("Error fetching trophies:", error);
      }
    };

    fetchTrofee();
  }, []);

  const handleEdit = (trofeeId) => {
    const selectedTrofee = trofee.find((trophy) => trophy.trofeeId === trofeeId);

    if (selectedTrofee) {
      if (showEditSection && editTrofee && editTrofee.trofeeId === trofeeId) {
        setShowEditSection(false);
      } else {
        setEditTrofee(selectedTrofee);
        setUploadedImage(`data:image/png;base64,${selectedTrofee.Imagine}`);

        const inputNume = document.getElementById("input-nume");
        const inputAn = document.getElementById("input-an");
        const inputEchipaId = document.getElementById("input-echipaId");

        if (inputNume) {
          inputNume.value = selectedTrofee.nume || "";
        }

        if (inputAn) {
          inputAn.value = selectedTrofee.an || "";
        }

        if (inputEchipaId) {
          inputEchipaId.value = selectedTrofee.echipaId || "";
        }

        setShowEditSection(true);
      }
    }
  };

  const handleDelete = (trofeeId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token lipsă. Utilizatorul nu este autentificat.");
      return;
    }

    fetch(`http://localhost:5050/api/trofee/${encodeURIComponent(trofeeId)}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Trofee șters cu succes!", data);
        const updatedTrofee = trofee.filter((trophy) => trophy.trofeeId !== trofeeId);
        setTrofee(updatedTrofee);
        setFilteredTrofee(updatedTrofee);
        window.location.reload();
      })
      .catch((error) => console.error("Eroare la ștergerea trofeelor:", error));
  };

  const handleImageUpload = (event) => {
    const image = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => setUploadedImage(reader.result);
    reader.readAsDataURL(image);
  };

  const handleInputChange = (event, field) => {
    setEditTrofee({
      ...editTrofee,
      [field]: event.target.value,
    });
  };

  const handleNumeChange = (event) => {
    handleInputChange(event, "nume");
  };

  const handleAnChange = (event) => {
    handleInputChange(event, "an");
  };

  const handleEchipaIdChange = (event) => {
    handleInputChange(event, "echipaId");
  };

  const sendRequest = (requestBody) => {
    const token = localStorage.getItem("token");

    try {
      fetch(`http://localhost:5050/api/trofee/${editTrofee.trofeeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Modificări salvate cu succes!", data);
        })
        .catch((error) => console.error("Eroare la salvare:", error));
    } catch (error) {
      console.error("Eroare la construirea cererii JSON:", error);
    }
  };

  const handleSalveaza = () => {
    if (!editTrofee) {
      console.error("Nu există trofee pentru a salva.");
      return;
    }

    const requestBody = {
      trofeeId: editTrofee.trofeeId,
      nume: editTrofee.nume,
      an: editTrofee.an,
      echipaId: editTrofee.echipaId,
      Imagine: uploadedImage ? uploadedImage.split("base64,")[1] : null,
    };

    sendRequest(requestBody);
    window.location.reload();
  };

  const handleAdaugaTrofee = () => {
    if (showEditSection) {
      setEditTrofee(null);
      setUploadedImage(null);
    } else {
      setShowEditSection(true);
    }
  };

  const handleFilterChange = (event) => {
    const selectedEchipaId = event.target.value;
    setEchipaFilter(selectedEchipaId);

    if (selectedEchipaId === "all") {
      setFilteredTrofee(trofee);
    } else {
      const filtered = trofee.filter((trophy) => trophy.echipaId === selectedEchipaId);
      setFilteredTrofee(filtered);
    }
  };

  return (
    <div className="container-trofee-admin">
      <div>
        <h4>{textTrofeeAdmin.textTitluTrofeeAdmin}</h4>
        <button onClick={handleAdaugaTrofee} className="button-adauga-trofee">
          {textTrofeeAdmin.textAdaugaTrofeu}
        </button>

        <div className="selecteazaEchipaTrofee">
          <label htmlFor="filter-echipaId">Filtrează după echipă:</label>
          <select id="filter-echipaId" onChange={handleFilterChange} value={echipaFilter}>
            <option value="all">Toate echipele</option>
            {/* Opțiuni pentru fiecare echipă */}
          </select>
        </div>
      </div>
      <div id="tabel-trofee-admin">
        <table>
          <thead>
            <tr>
              <th className="hidden">{textTrofeeAdmin.textSponsorId}</th>
              <th>{textTrofeeAdmin.textNume}</th>
              <th>{textTrofeeAdmin.textAn}</th>
              <th>{textTrofeeAdmin.textActiuni}</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrofee.map((trophy) => (
              <tr key={trophy.trofeeId}>
                <td className="hidden">{trophy.trofeeId}</td>
                <td>{trophy.nume}</td>
                <td>{trophy.an}</td>
                <td>
                  <button
                    className="edit-button"
                    title="Editează"
                    onClick={() => handleEdit(trophy.trofeeId)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="delete-button"
                    title="Șterge"
                    onClick={() => handleDelete(trophy.trofeeId)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showEditSection && (
        <div className="container-adaugare-trofee">
          <div className="coloana-stanga-ad-trofee">
            <div className="image-container">
              <h3>{textTrofeeAdmin.textSiglaTrofee}</h3>
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Trofee"
                  className="display-image"
                />
              ) : (
                <p>{textTrofeeAdmin.textLipsaImagine}</p>
              )}
              <label htmlFor="file-input" className="button-incarca-imagine">
                {textTrofeeAdmin.textIncarcaImagine}
              </label>
              <input id="file-input" type="file" onChange={handleImageUpload} />
            </div>
          </div>
          <div className="coloana-dreapta-ad-trofee">
            <div className="info-section">
              <div className="input-wrapper">
                <div className="numeTrofeeAdmin">
                  <label htmlFor="input-nume">
                    {textTrofeeAdmin.textEditareNume}
                  </label>
                  <input
                    type="text"
                    id="input-nume"
                    placeholder={textTrofeeAdmin.textPlaceholderNume}
                    value={editTrofee ? editTrofee.nume : ""}
                    onChange={handleNumeChange}
                  />
                </div>
                <div className="anTrofeeAdmin">
                  <label htmlFor="input-an">
                    {textTrofeeAdmin.textEditareAn}
                  </label>
                  <input
                    type="text"
                    id="input-an"
                    placeholder={textTrofeeAdmin.textPlaceholderAn}
                    value={editTrofee ? editTrofee.an : ""}
                    onChange={handleAnChange}
                  />
                </div>
                <div className="echipaTrofeeAdmin">
                  <label htmlFor="input-echipaId">
                    {textTrofeeAdmin.textEditareEchipa}
                  </label>
                  <input
                    type="text"
                    id="input-echipaId"
                    placeholder={textTrofeeAdmin.textPlaceholderEchipa}
                    value={editTrofee ? editTrofee.echipaId : ""}
                    onChange={handleEchipaIdChange}
                  />
                </div>
              </div>
              <button className="btn-salveaza-trofee" onClick={handleSalveaza}>
                {textTrofeeAdmin.textBtnSalveaza}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrofeeAdmin;
