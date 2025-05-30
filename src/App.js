import React from 'react';
import './App.css';
import Header from './components/header/Header.js';
import Hero from './components/hero/Hero.js';
import Drinks from './components/drinks/Drinks.js';
import Categories from './components/categories/Categories.js';
import NonAlcoholics from './components/non_alcoholics/Non_alcoholics.js';

function App() {
  return (
    <div className="App">
      <Header/>
      <Hero/>
      <Drinks/>
      <NonAlcoholics/>
      <Categories/>
    </div>
  );
}

export default App;
