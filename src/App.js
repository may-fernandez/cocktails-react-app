import React from 'react';
import './App.css';
import Header from './components/header/Header.js';
import Hero from './components/hero/Hero.js';
import Drinks from './components/drinks/Drinks.js';
import RandomDrink from './components/random/RandomDrink.js';

function App() {
  return (
    <div className="App">
      <Header/>
      <Hero/>
      <Drinks/>
      <RandomDrink/>
    </div>
  );
}

export default App;
