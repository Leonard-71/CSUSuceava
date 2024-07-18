import React, { useState, useEffect } from "react";
import "./JucatoriAdmin.scss";
import CategoriiEchipe from "../echipaadmin/categoriiEchipe/CategoriiEchipe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalJucatorAdmin from "./modalJucator/ModalJucatorAdmin";
import Modal from "react-modal";

const JucatoriAdmin = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [categorie, setCategorie] = useState("");
  const [editie, setEditie] = useState("");
  const [jucatori, setJucatori] = useState([]);
  const [selectedJucatorId, setSelectedJucatorId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const textJucatoriAdmin = {
    textSelectatiEchipa: " Selectati echipa:",
    textBtnAdaugaJucator: "Adaugă jucător",
    textNume: "Nume",
    textPrenume: "Prenume",
    textIdJucator: "Id jucator",
    textPozitie: "Pozitie",
    textDataNasterii: "Data nasterii",
    textActiuni: "Actiuni",
  };

  const handleDropdownChange = (selectedValue) => {
    setSelectedOption(selectedValue);
    const splittedValue = selectedValue.split("-");
    if (splittedValue.length >= 2) {
      setCategorie(splittedValue[0]);
      setEditie(splittedValue.slice(1).join("-"));
    } else {
      setCategorie("");
      setEditie("");
    }
    console.log("Elementul selectat:", selectedValue);
  };

  useEffect(() => {
    if (categorie !== "" && editie !== "") {
      fetch(
        `http://localhost:5050/api/jucator/echipa/CSU%20Suceava/editia/${editie}/categoria/${categorie}`
      )
        .then((response) => response.json())
        .then((data) => {
          setJucatori(data);
          if (data.length > 0) {
            console.log("Id-ul echipei:", data[0].echipaID);
          } else {
            console.log("Nu există date pentru echipă.");
          }
        })
        .catch((error) => console.error("Eroare:", error));
    }
  }, [categorie, editie]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    return `${formattedDay}-${formattedMonth}-${year}`;
  };

  const handleEdit = (id) => {
    setSelectedJucatorId(id);
    setModalIsOpen(true);
    console.log(`Editare jucator cu ID: ${id}`);
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5050/api/jucator/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Jucatorul cu ID ${id} a fost șters cu succes.`);
          return fetch(
            `http://localhost:5050/api/jucator/echipa/CSU%20Suceava/editia/${editie}/categoria/${categorie}`
          );
        }
        throw new Error("Ștergerea a eșuat.");
      })
      .then((response) => response.json())
      .then((data) => {
        setJucatori(data);
      })
      .catch((error) => console.error("Eroare:", error));
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const [echipaId, setEchipaId] = useState(null); // Adăugată stare pentru echipaId

  useEffect(() => {
    if (categorie !== "" && editie !== "") {
      fetch(
        `http://localhost:5050/api/jucator/echipa/CSU%20Suceava/editia/${editie}/categoria/${categorie}`
      )
        .then((response) => response.json())
        .then((data) => {
          setJucatori(data);
          if (data.length > 0) {
            const primaEchipa = data[0];
            console.log("Id-ul echipei:", primaEchipa.echipaID);
            setEchipaId(primaEchipa.echipaID); // Actualizează echipaId
          } else {
            console.log("Nu există date pentru echipă.");
          }
        })
        .catch((error) => console.error("Eroare:", error));
    }
  }, [categorie, editie]);

  const handleAddJucator = (jucatorData) => {
    const token = localStorage.getItem("token");

    if (echipaId) { // Verifică dacă echipaId este disponibil
      jucatorData = {
        ...jucatorData,
        echipaID: echipaId,
        dataNasterii: formatDate(jucatorData.dataNasterii),
      };

      fetch(`http://localhost:5050/api/jucator`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(jucatorData),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Adăugarea jucătorului a eșuat.");
        })
        .then((data) => {
          setJucatori([...jucatori, data]);
          closeModal();
        })
        .catch((error) => {
          console.error("Eroare:", error);
        });
    } else {
      console.error("EchipaID lipsă. Nu se poate adăuga jucătorul.");
    }
  };
  
  
  
  
  

  const handleOpenAddModal = () => {
    setModalIsOpen(true);
    setSelectedJucatorId(null);
  };

  return (
    <div className="container-echipa-admin">
      <div className="lista-echipe">
        {textJucatoriAdmin.textSelectatiEchipa}
        <CategoriiEchipe onChange={handleDropdownChange} />
      </div>

      {selectedOption && (
        <div id="tabel-jucatori-admin">
          <table>
            <thead>
              <tr>
                <th className="hidden">{textJucatoriAdmin.textIdJucator}</th>
                <th>{textJucatoriAdmin.textNume}</th>
                <th>{textJucatoriAdmin.textPrenume}</th>
                <th>{textJucatoriAdmin.textPozitie}</th>
                <th>{textJucatoriAdmin.textDataNasterii}</th>
                <th>{textJucatoriAdmin.textActiuni}</th>
              </tr>
            </thead>
            <tbody>
              {jucatori.map((jucator, index) => (
                <tr key={index}>
                  <td className="hidden">{jucator.jucatorID}</td>
                  <td>{jucator.nume}</td>
                  <td>{jucator.prenume}</td>
                  <td>{jucator.pozitie}</td>
                  <td>{formatDate(jucator.dataNasterii)}</td>
                  <td>
                    <button
                      className="edit-button"
                      title="Editeaza"
                      onClick={() => handleEdit(jucator.jucatorID)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="delete-button"
                      title="Sterge"
                      onClick={() => handleDelete(jucator.jucatorID)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            <button
              className="adauga-jucator-button"
              onClick={handleOpenAddModal}
            >
              {textJucatoriAdmin.textBtnAdaugaJucator}
            </button>
            {modalIsOpen && (
              <ModalJucatorAdmin
                isOpen={modalIsOpen}
                closeModal={closeModal}
                jucatorId={selectedJucatorId}
                onAddJucator={handleAddJucator}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JucatoriAdmin;
