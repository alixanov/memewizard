import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Sidebar, Home,  Profile, AllMeme, MemeGallery, MemeStream,Editor } from '../components';

const AppRoutes = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/editor" element={<MemeEditor />} /> */}
          <Route path="/gallery" element={<MemeGallery />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/all-memes" element={<AllMeme />} />
          <Route path="/all-streams" element={<MemeStream/>} />
          <Route path='/editor' element={<Editor/>} />
        </Routes>
      </main>
    </div>
  );
};

export default AppRoutes;