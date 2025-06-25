import Hero from '../components/hero/Hero.js';
import Drinks from '../components/home_drinks/HomeDrinks.js';
import RandomDrink from '../components/random/RandomDrink.js';
import NonAlcoholic from '../components/home_drinks/NonAlcoholic.js';
import Optional from '../components/home_drinks/Optional.js';



function HomePage() {
    
  return (
    <div>
      <Hero/>
      <Drinks/>
      <NonAlcoholic/>
      <Optional/>
      <RandomDrink/>
    </div>
  );
}

export default HomePage;
