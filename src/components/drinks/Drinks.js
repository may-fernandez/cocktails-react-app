import "./Drinks.css";
import { useState, useEffect } from "react";

// strCategory, strDrink: Nombre del trago, strGlass: vaso, strIngredient1-15, strInstructions
function Drinks() {
  const [vodkaCocktails, setVodkaCocktails] = useState([]);
  const [ginCocktails, setGinCocktails] = useState([]);
  const [loading, setLoading] = useState(true);

  const urlVodka =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=vodka";

  const urlGin = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin";

  useEffect(() => {
    const fetchVodkaDrinks = async () => {
      try {
        const response = await fetch(urlVodka);
        const data = await response.json();

        setVodkaCocktails(data.drinks.slice(0, 3));
        console.log(data.drinks.slice(0, 3));
      } catch (error) {
        console.error("Error fetching drinks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVodkaDrinks();
  }, []);

  useEffect(() => {
    const fetchGinDrinks = async () => {
      try {
        const response = await fetch(urlGin);
        const data = await response.json();

        setGinCocktails(data.drinks.slice(0, 3));
        console.log(data.drinks.slice(0, 3));

      }
      catch (error){
        console.error("Error fetching drinks:", error);
      }
      finally {
        setLoading(false);
      }
    }

    fetchGinDrinks();
  }, [])

  return (
    <div>
      <h1 className="title">Some Drinks</h1>

      <div className="container">
        <div className="drinks">
          <h2 className="container-subtitle">Vodka</h2>
          <ul className="drinks-ul">
            {vodkaCocktails?.map((drink) => (
              <li key={drink.idDrink} className="drink-card">
                <div >
                  <div className="card-titles">
                    <h2>{drink.strDrink}</h2> 
                    <h4>{drink.strCategory}</h4>
                  </div>  
                  
                  <div className="drink-content">
                    <p className="drink-description">{drink.strInstructions}</p>
                    <img src={drink.strDrinkThumb} className="drink-image" alt="Drink"/>                
                  </div>

                  
                </div>
                <div className="more-btn">
                    <button className="btn-more">More</button>
                </div>
              </li>
            ))}
          </ul>

          <h2 className="container-subtitle">Gin</h2>
          
          <ul className="drinks-ul">
            {ginCocktails?.map((drink) => (
              <li key={drink.idDrink} className="drink-card">
                <div>
                  <div className="card-titles">
                    <h2>{drink.strDrink}</h2>
                    <h4>{drink.strCategory}</h4>
                  </div>

                  <div className="drink-content">
                    <p className="drink-description">{drink.strInstructions}</p>
                    <img src={drink.strDrinkThumb} className="drink-image" alt="Drink"/>
                  </div>
                </div>

                <div className="more-btn">
                  <button className="btn-more">More</button>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
}

export default Drinks;
