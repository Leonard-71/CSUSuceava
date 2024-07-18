import React, { useState } from 'react';
import './AdaugareStire.scss'

export const AdaugareStire = ({ onClose }) => {
  const [titlu, setTitlu] = useState('');
  const [titluError, setTitluError] = useState('');
  const [continut, setContinut] = useState('');
  const [continutError, setContinutError] = useState('');
  const [imagine, setImagine] = useState('');
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
      });
    };

    convertToBase64(file)
      .then(base64Image => {
        setImagine(base64Image);
      })
      .catch(error => console.error('Error converting to Base64:', error));
  };

  const successModalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    height: '250px',
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    zIndex: '1000',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const closeModalMain = () => {
    setModalVisible(false);
    setSuccessModalVisible(false);
    setTitlu('');
    setContinut('');
    setImagine('');
  };

  const handleAddNews = async () => {
    const currentDate = new Date().toISOString();
    const newsData = {
      titlu: titlu,
      continut: continut,
      imagine1: imagine,
      datapublicarii: currentDate
    };

    if (!titlu.trim()) {
      setTitluError('Titlul nu poate fi gol.');
    } else {
      setTitluError('');
    }

    if (!continut.trim()) {
      setContinutError('Conținutul nu poate fi gol.');
    } else {
      setContinutError('');
    }

    if (titlu && continut && !titluError && !continutError) {
      try {
        const response = await fetch('http://localhost:5050/api/stire', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newsData),
        });

        if (response.ok) {
          setSuccessModalVisible(true);
          setModalVisible(false);
          onClose();
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }

      } catch (error) {
        console.error('Error adding news:', error);
      }
    }
  };

  const closeModal = () => {
    setSuccessModalVisible(false);
  };

  return (
    <div className="modal-container" style={{ display: 'flex', visibility: modalVisible ? 'visible' : 'hidden' }}>
      <div className="modal" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div className="modal-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '1200px', height: '600px', textAlign: 'center' }}>
          <button onClick={closeModalMain} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>&times;</button>
          <h2>Adaugă Știre Nouă</h2>
          <textarea placeholder='Titlu stire' type="text" value={titlu} onChange={(e) => { setTitlu(e.target.value); setTitluError(''); }} style={{ minHeight: '50px', maxHeight: '200px', width: '300px', margin: '0 auto', marginBottom: '3%', border: titluError ? '2px solid red' : 'none' }} />
          {titluError && <p style={{ color: 'red', marginBottom: '10px' }}>{titluError}</p>}
          <textarea placeholder='Continut stire' value={continut} onChange={(e) => { setContinut(e.target.value); setContinutError(''); }} style={{ minHeight: '100px', maxHeight: '400px', width: '1000px', margin: '0 auto', marginBottom: '3%', border: continutError ? '2px solid red' : 'none' }} />
          {continutError && <p style={{ color: 'red', marginBottom: '10px' }}>{continutError}</p>}
          <label style={{ backgroundColor: 'white', border: 'none', color: 'white', padding: '16px 32px', textAlign: 'center', fontSize: '16px', margin: '4px 2px', opacity: '0.6', transition: '0.3s', display: 'inline-block', textDecoration: 'none', cursor: 'pointer', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fas fa-file-upload"></i>
            <input type="file" style={{ display: 'none' }} onChange={handleImageUpload} />
          </label>
          {imagine && (
            <img src={`data:image/png;base64,${imagine}`} alt="Preview" style={{ maxWidth: '400px', maxHeight: '250px' }} />
          )}
          <button onClick={handleAddNews} style={{ margin: '0 auto',marginTop:'20px',width:'130px' }}>Adaugă</button>
        </div>
      </div>
      {successModalVisible && (
        <div className="success-modal" style={successModalStyle}>
          <div className="success-modal-content">
            <p>Adaugare reusita!</p>
            <button onClick={closeModal}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdaugareStire;
