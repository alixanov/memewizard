import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Sidebar, Home, MemeEditor, MemeGallery } from '../components';

const AppRoutes = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/editor" element={<MemeEditor />} />
          <Route path="/gallery" element={<MemeGallery />} /> */}
        </Routes>
      </main>
    </div>
  );
};

export default AppRoutes;