import React, { useState, useEffect } from "react";
import "./SponsoriAdmin.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const SponsoriAdmin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [sponsori, setSponsori] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [editSponsor, setEditSponsor] = useState(null);
  const [showEditSection, setShowEditSection] = useState(false);
  const [filteredSponsori, setFilteredSponsori] = useState([]);

  const textSponsoriAdmin = {
    textTitluSponsoriAdmin: "Sponsori",
    textSponsorId: "Sponsor ID",
    textNumeComplet: "Nume",
    textLinkSiteExtern: "Link",
    textEditie: "Editie",
    textEditareNume: "NUME:",
    textEditareLink: "LINK:",
    textActiuni: "Actiuni",
    textIncarcaImagine: "Încarcă imagine",
    textLipsaImagine: "Nicio imagine încărcată pentru sponsor",
    textBtnSalveaza: "Salvează",
    textEditareEditie: "EDITIE:",
    textPlaceholderEditie: "Introduceți ediția aici",
    textPlaceholderNume: "Introduceți numele aici",
    textPlaceholderLink: "Introduceți link-ul aici",
    textAdaugaSponsor: "Adaugă sponsor",
    filtrareEditie: "Filtrează după ediție:",
    textEditieFiltru: "toate",
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    fetch("http://localhost:5050/api/sponsor")
      .then((response) => response.json())
      .then((data) => {
        setSponsori(data);
        setFilteredSponsori(data); // Initializează lista filtrată cu toți sponsori la început
      })
      .catch((error) => console.error("Eroare:", error));
  }, []);

  const handleEdit = (sponsorId) => {
    const selectedSponsor = sponsori.find(
      (sponsor) => sponsor.sponsorId === sponsorId
    );

    if (selectedSponsor) {
      if (
        showEditSection &&
        editSponsor &&
        editSponsor.sponsorId === sponsorId
      ) {
        setShowEditSection(false);
      } else {
        setEditSponsor(selectedSponsor);
        setUploadedImage(`data:image/png;base64,${selectedSponsor.Imagine}`);

        const inputEditie = document.getElementById("input-editie");
        const inputNume = document.getElementById("input-nume");
        const inputLink = document.getElementById("input-link");

        if (inputEditie) {
          inputEditie.value = selectedSponsor.editia || "";
        }

        if (inputNume) {
          inputNume.value = selectedSponsor.numeComplet || "";
        }

        if (inputLink) {
          inputLink.value = selectedSponsor.linkSiteExtern || "";
        }

        setShowEditSection(true);
      }
    }
  };

  const handleDelete = (sponsorId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token lipsă. Utilizatorul nu este autentificat.");
      return;
    }

    fetch(
      `http://localhost:5050/api/sponsor/${encodeURIComponent(sponsorId)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Sponsor șters cu succes!", data);
        const updatedSponsori = sponsori.filter(
          (sponsor) => sponsor.sponsorId !== sponsorId
        );
        setSponsori(updatedSponsori);
        setFilteredSponsori(updatedSponsori);
        window.location.reload();
      })
      .catch((error) =>
        console.error("Eroare la ștergerea sponsorului:", error)
      );
  };

  const handleImageUpload = (event) => {
    const image = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => setUploadedImage(reader.result);
    reader.readAsDataURL(image);
  };

  const handleInputChange = (event, field) => {
    setEditSponsor({
      ...editSponsor,
      [field]: event.target.value,
    });
  };

  const handleNumeChange = (event) => {
    handleInputChange(event, "numeComplet");
  };

  const handleLinkChange = (event) => {
    handleInputChange(event, "linkSiteExtern");
  };

  const sendRequest = (requestBody) => {
    const token = localStorage.getItem("token");
    console.log("Authorization Token:", token);

    try {
      fetch(`http://localhost:5050/api/sponsor/${editSponsor.sponsorId}`, {
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
    if (!editSponsor) {
      console.error("Nu există sponsor pentru a salva.");
      return;
    }

    const requestBody = {
      sponsorId: editSponsor.sponsorId,
      numeComplet: editSponsor.numeComplet,
      linkSiteExtern: editSponsor.linkSiteExtern,
      editia: editSponsor.editia,
      Imagine: uploadedImage ? uploadedImage.split("base64,")[1] : null,
    };

    sendRequest(requestBody);
    window.location.reload();
  };

  const handleAdaugaSponsor = () => {
    if (showEditSection) {
      setEditSponsor(null);
      setUploadedImage(null);
    } else {
      setShowEditSection(true);
    }
  };

  const handleEditieChange = (event) => {
    handleInputChange(event, "editia");
  };

  const handleFilterChange = (event) => {
    const selectedEditie = event.target.value;
    if (selectedEditie === "all") {
      setFilteredSponsori(sponsori);
    } else {
      const filtered = sponsori.filter(
        (sponsor) => sponsor.editia === selectedEditie
      );
      setFilteredSponsori(filtered);
    }
  };

  return (
    <div className="container-sponsori-admin">
      <div>
        <h4>{textSponsoriAdmin.textTitluSponsoriAdmin}</h4>
        <button onClick={handleAdaugaSponsor} className="button-adauga-sponsor">
          {textSponsoriAdmin.textAdaugaSponsor}
        </button>

        <div className="selecteazaEditieSponsori">
          <label htmlFor="filter-editie">
            {textSponsoriAdmin.filtrareEditie}
          </label>
          <select id="filter-editie" onChange={handleFilterChange}>
            <option value="all">{textSponsoriAdmin.textEditieFiltru}</option>
            {Array.from(new Set(sponsori.map((sponsor) => sponsor.editia))).map(
              (editie, index) => (
                <option key={index} value={editie}>
                  {editie}
                </option>
              )
            )}
          </select>
        </div>
      </div>
      <div id="tabel-sponsori-admin">
        <table>
          <thead>
            <tr>
              <th className="hidden">{textSponsoriAdmin.textSponsorId}</th>
              <th>{textSponsoriAdmin.textNumeComplet}</th>
              <th>{textSponsoriAdmin.textLinkSiteExtern}</th>
              <th>{textSponsoriAdmin.textEditie}</th>
              <th>{textSponsoriAdmin.textActiuni}</th>
            </tr>
          </thead>
          <tbody>
            {filteredSponsori.map((sponsor, index) => (
              <tr key={index}>
                <td className="hidden">{sponsor.sponsorId}</td>
                <td>{sponsor.numeComplet}</td>
                <td>{sponsor.linkSiteExtern}</td>
                <td>{sponsor.editia}</td>
                <td>
                  <button
                    className="edit-button"
                    title="Editează"
                    onClick={() => handleEdit(sponsor.sponsorId)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="delete-button"
                    title="Șterge"
                    onClick={() => handleDelete(sponsor.sponsorId)}
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
        <div className="container-adaugare-sponsor">
          <div className="coloana-stanga-ad-sponsor">
            <div className="image-container">
              <h3>{textSponsoriAdmin.textSiglaSponsor}</h3>
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Sponsor"
                  className="display-image"
                />
              ) : (
                <p>{textSponsoriAdmin.textLipsaImagine}</p>
              )}
              <label htmlFor="file-input" className="button-incarca-imagine">
                {textSponsoriAdmin.textIncarcaImagine}
              </label>
              <input id="file-input" type="file" onChange={handleImageUpload} />
            </div>
          </div>
          <div className="coloana-dreapta-ad-sponsor">
            <div className="info-section">
              <div className="input-wrapper">
                <div className="editieSponsorAdmin">
                  <label htmlFor="input-editie">
                    {textSponsoriAdmin.textEditareEditie}
                  </label>
                  <input
                    type="text"
                    id="input-editie"
                    placeholder={textSponsoriAdmin.textPlaceholderEditie}
                    value={editSponsor ? editSponsor.editia : ""}
                    onChange={handleEditieChange}
                  />
                </div>
                <div className="numeSponsorAdmin">
                  <label htmlFor="input-nume">
                    {textSponsoriAdmin.textEditareNume}
                  </label>
                  <input
                    type="text"
                    id="input-nume"
                    placeholder={textSponsoriAdmin.textPlaceholderNume}
                    value={editSponsor ? editSponsor.numeComplet : ""}
                    onChange={handleNumeChange}
                  />
                </div>

                <div className="linkSponsorAdmin">
                  <label htmlFor="input-link">
                    {textSponsoriAdmin.textEditareLink}
                  </label>
                  <input
                    type="text"
                    id="input-link"
                    placeholder={textSponsoriAdmin.textPlaceholderLink}
                    value={editSponsor ? editSponsor.linkSiteExtern : ""}
                    onChange={handleLinkChange}
                  />
                </div>
              </div>
              <button className="btn-salveaza" onClick={handleSalveaza}>
                {textSponsoriAdmin.textBtnSalveaza}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SponsoriAdmin;
