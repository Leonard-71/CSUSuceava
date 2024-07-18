import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './Administrator.scss';
import MeciuriAdmin from './meciuriadmin/MeciuriAdmin';
import Utilizatori from './utilizatori/Utilizatori'
import EchipaAdmin from './echipaadmin/EchipaAdmin';
import JucatoriAdmin from './jucatoriadmin/JucatoriAdmin';
import NoutatiAdmin from './noutatiadmin/NoutatiAdmin';
import SponsoriAdmin from './sponsoriadmin/SponsoriAdmin';
import TrofeeAdmin from './trofeeadmin/TrofeeAdmin';


const Administrator = () => {
  return (
    <div className="admin-container">
      <div className="sidebar">
        <ul>
          <li>
            <Link to='/administrator/utilizatori'>Utilizatori</Link>
            <Link to='/administrator/echipaadmin'>Echipe</Link>
            <Link to='/administrator/jucatoriadmin'>Jucatori</Link>
            <Link to='/administrator/meciuriadmin'>Meciuri</Link>
            <Link to='/administrator/noutatiadmin'>Noutati</Link>
            <Link to='/administrator/sponsoriadmin'>Sponsori</Link>
            <Link to='/administrator/trofeeadmin'>Trofee</Link>
            
          </li>
        </ul>
      </div>
      <div className="main-content">
        <Routes>
          <Route path="/utilizatori" element={<Utilizatori />} />
          <Route path="/meciuriadmin" element={<MeciuriAdmin />} />
          <Route path="/echipaadmin" element={<EchipaAdmin />} />
          <Route path="/jucatoriadmin" element={<JucatoriAdmin />} />
          <Route path="/noutatiadmin" element={<NoutatiAdmin />} />
          <Route path="/sponsoriadmin" element={<SponsoriAdmin />} />
          <Route path="/trofeeadmin" element={<TrofeeAdmin />} />
        </Routes>
      </div>
    </div>
  );
};

export default Administrator;
