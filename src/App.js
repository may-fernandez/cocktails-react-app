import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import DrinksPage from './pages/DrinksPage.js';
import HomePage from './pages/HomePage.js';
import Header from './components/header/Header.js';
import Footer from './components/footer/Footer.js';


function App() {
  return (
    <Router basename='cocktails-react-app'>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/drinks" element={<DrinksPage />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
