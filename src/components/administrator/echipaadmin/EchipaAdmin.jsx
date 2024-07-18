import React, { useState, useEffect } from "react";
import "./EchipaAdmin.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const EchipaAdmin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [echipe, setEchipe] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [editEchipa, setEditEchipa] = useState(null);
  const [showEditSection, setShowEditSection] = useState(false);

  const textEchipaAdmin = {
    textTitluEchipaAdmin: "Echipe",
    textEchipId: "Echipa ID",
    textNumeEchipa: "Nume",
    textCategorie: "Categorie",
    textEditie: "Editie",
    textActiuni: "Actiuni",
    textIncarcaImagine: "Încarcă imagine",
    textLipsaImagine: "Nicio imagine încărcată pentru echipă",
    textSiglaEchipa: "Siglă echipă",
    textBtnSalveaza: "Salvează",
    textEditareCategorie: "CATEGORIE:",
    textEditareEditie: "EDITIE:",
    textPlaceholderCategorie: "Introduceți categoria aici",
    textPlaceholderEditie: "Introduceți ediția aici",
    textAdaugaEchipa: "Adaugă echipă",
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    fetch("http://localhost:5050/api/echipa")
      .then((response) => response.json())
      .then((data) => {
        const echipeCSU = data.filter((echipa) => echipa.nume === "CSU Suceava");
        setEchipe(echipeCSU);
      })
      .catch((error) => console.error("Eroare:", error));
  }, []);

  const handleEdit = (echipaId) => {
    const selectedEchipa = echipe.find((echipa) => echipa.echipaId === echipaId);

    if (selectedEchipa) {
      if (showEditSection && editEchipa && editEchipa.echipaId === echipaId) {
        setShowEditSection(false);
      } else {
        setEditEchipa(selectedEchipa);
        setUploadedImage(`data:image/png;base64,${selectedEchipa.imagine}`);

        const inputCategorie = document.getElementById("input-categorie");
        const inputEditie = document.getElementById("input-editie");

        if (inputCategorie && inputEditie) {
          inputCategorie.value = selectedEchipa.categorie || "";
          inputEditie.value = selectedEchipa.editia || "";
        }

        setShowEditSection(true);
      }
    }
  };

  const handleDelete = (echipaId) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("Token lipsă. Utilizatorul nu este autentificat.");
      return;
    }
  
    fetch(`http://localhost:5050/api/jucator`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((jucatori) => {
        const echipaSelectataId = echipaId;
        const jucatoriEchipaSelectata = jucatori.filter((jucator) => jucator.echipaID === echipaSelectataId);
  
        const jucatoriToDelete = jucatoriEchipaSelectata.map((jucator) => jucator.jucatorId);
  
        if (jucatoriToDelete.length > 0) {
          fetch(`http://localhost:5050/api/jucatori`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ jucatoriIds: jucatoriToDelete }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Jucători șterși cu succes!", data);
            })
            .catch((error) => console.error("Eroare la ștergerea jucătorilor:", error));
        }
      })
      .catch((error) => console.error("Eroare la obținerea jucătorilor:", error));
  
    fetch(`http://localhost:5050/api/echipa/${encodeURIComponent(echipaId)}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Echipa ștearsă cu succes!", data);
        const updatedEchipe = echipe.filter((echipa) => echipa.echipaId !== echipaId);
        setEchipe(updatedEchipe);
        window.location.reload();
      })
      .catch((error) => console.error("Eroare la ștergerea echipei:", error));
  };
  
  
  

  const handleImageUpload = (event) => {
    const image = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => setUploadedImage(reader.result);
    reader.readAsDataURL(image);
  };

  const handleInputChange = (event, field) => {
    setEditEchipa({
      ...editEchipa,
      [field]: event.target.value,
    });
  };


  const sendRequest = (requestBody) => {
    const token = localStorage.getItem("token");
    console.log("Authorization Token:", token);
  
    try {
      fetch(`http://localhost:5050/api/echipa/${editEchipa.echipaId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          console.log("Response Headers:", response.headers);
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
    if (!editEchipa) {
      console.error("Nu există echipă pentru a salva.");
      return;
    }
  
    const requestBody = {
      echipaId: editEchipa.echipaId,
      nume: editEchipa.nume,
      categorie: editEchipa.categorie, 
      editia: editEchipa.editia, 
      imagine: uploadedImage ? uploadedImage.split("base64,")[1] : null,
    };
  
    sendRequest(requestBody);
    window.location.reload();
  };
  
  

  const handleAdaugaEchipa = () => {
    if (showEditSection) {
      setEditEchipa(null);
      setUploadedImage(null);
    } else {
      setShowEditSection(true);
    }
  };


  const handleCategorieChange = (event) => {
    handleInputChange(event, 'categorie');
  };
  
  const handleEditieChange = (event) => {
    handleInputChange(event, 'editia');
  };

  return (
    <div className="container-echipe-admin">
      <div>
        <h4>{textEchipaAdmin.textTitluEchipaAdmin}</h4>
        <button onClick={handleAdaugaEchipa} className="button-adauga-echipa">
          {textEchipaAdmin.textAdaugaEchipa}
        </button>
      </div>
      <div id="tabel-echipe-admin">
        <table>
          <thead>
            <tr>
              <th className="hidden">{textEchipaAdmin.textEchipId}</th>
              <th className="hidden">{textEchipaAdmin.textNumeEchipa}</th>
              <th>{textEchipaAdmin.textCategorie}</th>
              <th>{textEchipaAdmin.textEditie}</th>
              <th>{textEchipaAdmin.textActiuni}</th>
            </tr>
          </thead>
          <tbody>
            {echipe.map((echipa, index) => (
              <tr key={index}>
                <td className="hidden">{echipa.echipaId}</td>
                <td className="hidden">{echipa.nume}</td>
                <td>{echipa.categorie}</td>
                <td>{echipa.editia}</td>
                <td>
                  <button
                    className="edit-button"
                    title="Editează"
                    onClick={() => handleEdit(echipa.echipaId)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="delete-button"
                    title="Șterge"
                    onClick={() => handleDelete(echipa.echipaId)}
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
        <div className="container-adaugare-echipa">
          <div className="coloana-stanga-ad-echipa">
            <div className="image-container">
              <h3>{textEchipaAdmin.textSiglaEchipa}</h3>
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Echipă"
                  className="display-image"
                />
              ) : (
                <p>{textEchipaAdmin.textLipsaImagine}</p>
              )}
              <label htmlFor="file-input" className="button-incarca-imagine">
                {textEchipaAdmin.textIncarcaImagine}
              </label>
              <input id="file-input" type="file" onChange={handleImageUpload} />
            </div>
          </div>

          <div className="coloana-dreapta-ad-echipa">
            <div className="info-section">
              <div className="input-wrapper">
                <label htmlFor="input-categorie">
                  {textEchipaAdmin.textEditareCategorie}
                </label>
                <input
                  type="text"
                  id="input-categorie"
                  placeholder={textEchipaAdmin.textPlaceholderCategorie}
                  value={editEchipa ? editEchipa.categorie : ""}
                  onChange={handleCategorieChange}
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="input-editie">
                  {textEchipaAdmin.textEditareEditie}
                </label>
                <input
                  type="text"
                  id="input-editie"
                  placeholder={textEchipaAdmin.textPlaceholderEditie}
                  value={editEchipa ? editEchipa.editia : ""}
                  onChange={handleEditieChange}
                />
              </div>
              <button className="btn-salveaza" onClick={handleSalveaza}>
                {textEchipaAdmin.textBtnSalveaza}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EchipaAdmin;
