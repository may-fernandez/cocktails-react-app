import Hero from '../components/hero/Hero.js';
import Drinks from '../components/drinks/Drinks.js';
import RandomDrink from '../components/random/RandomDrink.js';
import Categories from '../components/categories/Categories.js';
import {useLocation} from 'react-router-dom';


function HomePage() {
    const location = useLocation();
    const home = Location.pathname === '/';
  return (
    <div>
      <Hero/>
      <Drinks/>
      <RandomDrink/>
      <Categories/>
    </div>
  );
}

export default HomePage;
