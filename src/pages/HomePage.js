import Hero from '../components/hero/Hero.js';
import Drinks from '../components/home_drinks/HomeDrinks.js';
import RandomDrink from '../components/random/RandomDrink.js';
import Categories from '../components/categories/Categories.js';
import NonAlcoholic from '../components/non_alcoholic/NonAlcoholic.js';



function HomePage() {
    
  return (
    <div>
      <Hero/>
      <Drinks/>
      <NonAlcoholic/>
      <RandomDrink/>
      <Categories/>
    </div>
  );
}

export default HomePage;
