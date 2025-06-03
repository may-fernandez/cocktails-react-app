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


  return (
    <div>
      <h1 className="title">Random Drink</h1>
      <div className="rand-drink-container">
        <div className="rand-instructions">
          <h3>Lookup a random cocktail</h3>
          <button onClick={fetchRandomDrink}>{randomDrink ? "Get new cocktail" : "Get cocktail"}</button>
        </div>
        {randomDrink && visible && (
            <div></div>
        )}
      </div>
    </div>
  );
}

export default RandomDrink;
