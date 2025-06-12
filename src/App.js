import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import CategoriesPage from './pages/CategoriesPage.js';
import HomePage from './pages/HomePage.js';
import Header from './components/header/Header.js';
import Footer from './components/footer/Footer.js';

function App() {
  return (
    <div className='App'>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
