import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Submit from './pages/Submit';
import Cookbook from './pages/Cookbook';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/submit" element={<Submit />} />
      <Route path="/cookbook" element={<Cookbook />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;


