import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoriesPage from './pages/CategoriesPage.js';
import HomePage from './pages/HomePage.js';
import Header from './components/header/Header.js';
import Footer from './components/footer/Footer.js';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/categories" element={<CategoriesPage/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
