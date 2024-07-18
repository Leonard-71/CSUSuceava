import React, { useState, useEffect } from 'react';
import './NoutatiAdmin.scss';
import ListaStiri from './listastiri/ListaStiri';
import AdaugareStire from './adaugarestire/AdaugareStire';

export const NoutatiAdmin = () => {
    const [selectedNews, setSelectedNews] = useState({
        titlu: '',
        continut: '',
        imagine1: '',
        imagine2: '',
        imagine3: '',
        stireid: '',
        datapublicarii: '',
        username:'',
    });

    const [isCardClicked, setIsCardClicked] = useState(false);
    const [dummyState, setDummyState] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [successMessage, setSuccessMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const displaySuccessMessage = (message) => {
        setSuccessMessage(message);
        setTimeout(() => {
            setSuccessMessage('');
        }, 5500);
    };

    useEffect(() => {
        const loadImage = () => {
            if (isCardClicked && selectedNews.imagine1) {
                const img = new Image();
                img.onload = () => {
                    setDummyState(new Date());
                };
                img.src = `data:image/png;base64,${selectedNews.imagine1}`;
            }
        };

        loadImage();
    }, [isCardClicked, selectedNews.imagine1]);

    const handleNewsSelect = (news) => {
        setSelectedNews(news);
        setIsCardClicked(true);
    };

    const handleTitluChange = (e) => {
        setSelectedNews((prevNews) => ({
            ...prevNews,
            titlu: e.target.value,
        }));
    };

    const handleContinutChange = (e) => {
        setSelectedNews((prevNews) => ({
            ...prevNews,
            continut: e.target.value,
        }));
    };


    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        const convertToBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result.split(',')[1]);
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(file);
            });
        };

        convertToBase64(file)
            .then((base64Image) => {
                setSelectedNews((prevNews) => ({
                    ...prevNews,
                    imagine1: base64Image,
                }));
            })
    };

    const handleAddNews = () => {
        setIsModalOpen(true);
    };

    const handleDeleteNews = async () => {
        try {
            if (!selectedNews.stireid) {
                displaySuccessMessage('Stergere esuata. Nicio stire selectata pentru stergere');
                return;
            }
    
            await fetch(`http://localhost:5050/api/stire/${selectedNews.stireid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            
            displaySuccessMessage('Stergere reusita');
        } catch (error) {
            displaySuccessMessage('Stergere esuata');
        }
    };
    
    const handleUpdateNews = async () => {
        try {
            if (!selectedNews.stireid) {
                displaySuccessMessage('Actualizare esuata. Nicio stire selectata pentru actualizare');
                return;
            }
    
            const updatePayload = {
                datapublicarii: selectedNews.datapublicarii,
                titlu: selectedNews.titlu,
                continut: selectedNews.continut,
                username: selectedNews.username,
                isinfuture: false,
                isdeleted: false,
                imagine1: null,
                imagine2: null,
                imagine3: null,
                video: null,
            };
    
            const response = await fetch(`http://localhost:5050/api/stire/${selectedNews.stireid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatePayload),
            });
    
            if (response.ok) {
                displaySuccessMessage('Actualizare reusita');
            } else {
                const errorMessage = await response.text();
                displaySuccessMessage(`Eroare la actualizare: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Eroare la actualizare:', error);
            displaySuccessMessage('Eroare la actualizare');
        }
    };
    
    
    return (
        <div className="noutati-container-admin">
            <div className="modificare-stiri-admin">
                <div className="date-stiri-admin">
                    <div className="container-titlu">
                        <textarea
                            type="text"
                            name="input1"
                            id="input1"
                            placeholder="Titlu știre"
                            value={selectedNews.titlu}
                            onChange={handleTitluChange}
                        />
                    </div>
                    <div className="container-imagini">
                        {isCardClicked && (selectedNews.imagine1 || selectedNews.imagine1 === '') && (
                            <img
                                className="imagine-stire"
                                src={
                                    selectedNews.imagine1
                                        ? `data:image/png;base64,${selectedNews.imagine1}`
                                        : selectedNews.imagine1
                                }
                                alt="Imagine1"
                            />
                        )}
                    </div>
                    <div className="container-imagine-admin">
                        <textarea
                            name="input3"
                            id="input3"
                            placeholder="Conținut știre"
                            value={selectedNews.continut}
                            onChange={handleContinutChange}
                        />
                    </div>
                </div>
                <div className="butoane-stiri">
                    <button className="buton-stire" onClick={handleAddNews}>
                        Adauga
                    </button>
                    <button className="buton-stire" onClick={handleDeleteNews}>
                        Șterge
                    </button>
                    <button className="buton-stire" onClick={handleUpdateNews}>
                        Actualizează
                    </button>
                    <label className="buton-stire">
                        <i className="fas fa-file-upload"></i>
                        <input type="file" style={{ display: 'none' }} onChange={handleImageUpload} />
                    </label>
                </div>
                <div className="pop-up" style={{ display: successMessage ? 'block' : 'none' }}>
                    {successMessage}
                </div>
            </div>
            <div className="lista-stiri-admin">
                <ListaStiri onNewsSelect={handleNewsSelect} />
            </div>
            {isModalOpen && <AdaugareStire key={new Date()} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default NoutatiAdmin;
