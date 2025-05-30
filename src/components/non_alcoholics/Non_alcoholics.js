import "./Non_alcoholics.css";
import { useState, useEffect } from "react";

function NonAlcoholics() {
  const [naDrinks, setNaDrinks] = useState([]);
  const urlNonAlocholics =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";

  useEffect(() => {
    const fetchNaDrink = async () => {
      try {
        const response = await fetch(urlNonAlocholics);
        const data = await response.json();

        setNaDrinks(data.drinks.slice(0, 4));
        console.log(data.drinks.slice(0, 4));
      } catch (error) {
        console.log("Error fetching non alcoholic drinks:", error);
      }
    };

    fetchNaDrink();
  }, []);

  return (
    <div>
      <h1 className="title">Non-Alcoholic drinks</h1>
      <div className="drinks">
        <ul className="drinks-ul">
          {naDrinks?.map((naDrink) => (
            <li key={naDrink.idDrink} className="drink-card">
              <div>
                <div className="card-titles">
                  <h2>{naDrink.strDrink}</h2>
                  <h4>Non-Alcoholic</h4>
                </div>

                <div className="drink-content">
                  <img src={naDrink.strDrinkThumb} className="drink-image" />
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
  );
}

export default NonAlcoholics;
