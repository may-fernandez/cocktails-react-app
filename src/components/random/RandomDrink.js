import { useState, useEffect } from "react";
import "./RandomDrink.css";

function RandomDrink() {
  const [randomDrink, setRandomDrink] = useState(null);
  const [visible, setVisible] = useState(false);

  const urlRandom = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

  const fetchRandomDrink = async () => {
    try {
      const response = await fetch(urlRandom);
      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }

      const json = await response.json();
      const data = json.drinks[0];

      console.log(data);
      setRandomDrink(data);
      setVisible(true);
    } catch (error) {
      console.error("Error fetching random drink api", error);
    }
  };

  // strCategory, strDrink: Nombre del trago, strGlass: vaso, strIngredient1-15, strInstructions

  return (
    <div>
      <h1 className="title">Random Drink</h1>
      <div className="rand-drink-container">
        <div className="rand-instructions">
          <h3>Lookup a random cocktail</h3>
          <button onClick={fetchRandomDrink}>
            {randomDrink ? "Get new cocktail" : "Get cocktail"}
          </button>
        </div>
        {randomDrink && visible && (
          <div className="rand-drink-card">
            <div className="rand-drink-content">
              <div className="rand-card-titles">
                <h2>{randomDrink.strDrink}</h2>
                <h4>{randomDrink.strCategory}</h4>
              </div>

              <div className="rand-img-container">
                <img
                  src={randomDrink.strDrinkThumb}
                  alt="drink"
                  className="rand-drink-image"
                />
              </div>
            </div>

            <div className="more-btn">
              <button className="btn-more">More</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RandomDrink;
