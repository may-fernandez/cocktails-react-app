import React from "react";
import "./Drinks.css";
import { useState, useEffect } from "react";

// strCategory, strDrink: Nombre del trago, strGlass: vaso, strIngredient1-15, strInstructions
function Drinks() {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);

  const url =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        setCocktails(data.drinks.slice(0, 3));
        console.log(data.drinks);
      } catch (error) {
        console.error("Error fetching drinks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrinks();
  }, []);

  return (
    <div>
      <h1 className="subtitle">Classic Drinks</h1>

      <div className="container">
        <div className="margaritas">
          <h2>Margaritas</h2>
          <ul className="drinks-ul">
            {cocktails?.map((drink) => (
              <li key={drink.idDrink}>
                <div className="drink-card">
                  <div className="card-content">
                    <h2>{drink.strDrink}</h2> 
                    <h4>{drink.strCategory}</h4>
                    <img src={drink.strDrinkThumb} />                
                    <p>{drink.strInstructions}</p>
                  </div>
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
