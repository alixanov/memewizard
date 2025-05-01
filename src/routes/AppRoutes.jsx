import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Sidebar, Home, Hot} from '../components';


const AppRoutes = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Routes basename="/">
          <Route path="/" element={<Home />} />
          <Route path="/hot" element={<Hot />} />
        </Routes>
      </main>
    </div>
  );
};

export default AppRoutes;