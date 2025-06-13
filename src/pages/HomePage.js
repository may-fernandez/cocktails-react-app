import Hero from '../components/hero/Hero.js';
import Drinks from '../components/home_drinks/HomeDrinks.js';
import RandomDrink from '../components/random/RandomDrink.js';
import Categories from '../components/categories/Categories.js';



function HomePage() {
    
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
