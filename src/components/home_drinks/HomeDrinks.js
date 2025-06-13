import "./HomeDrinks.css";
import { useState, useEffect, useRef } from "react";


// strCategory, strDrink: Nombre del trago, strGlass: vaso, strIngredient1-15, strInstructions
function Drinks() {
  const [vodkaCocktails, setVodkaCocktails] = useState([]);
  const [ginCocktails, setGinCocktails] = useState([]);


  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [idActive, setIdActive] = useState(null);
  const modalRef = useRef(null);

  const urlVodka =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=vodka";

  const urlGin = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin";


  useEffect(() => {
    const fetchVodkaDrinks = async () => {
      try {
        const response = await fetch(urlVodka);
        if(!response.ok){
          throw new Error("Error in API response");
        }
        const data = await response.json();

        setVodkaCocktails(data.drinks.slice(0, 4));
        console.log(data.drinks.slice(0, 4));
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
        if(!response.ok){
          throw new Error("Error in API response");
        }

        const data = await response.json();

        setGinCocktails(data.drinks.slice(0, 4));
        console.log(data.drinks.slice(0, 4));
      } catch (error) {
        console.error("Error fetching drinks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGinDrinks();
  }, []);



  const openModal = (item) => setIdActive(item);
  const closeModal = () => setIdActive(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal(); // Se cierra el div si haces click fuera
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <h1 className="title">Alcoholic Drinks</h1>

      <div className="container">
        <div className="drinks">
          <h2 className="container-subtitle">Vodka</h2>
          <ul className="drinks-ul">
            {vodkaCocktails?.map((drink) => (
              <li key={drink.idDrink} className="drink-card">
                <div>
                  <div className="card-titles">
                    <h2>{drink.strDrink}</h2>
                    <h4>{drink.strCategory}</h4>
                  </div>

                  <div className="drink-content">
                    <img
                      src={drink.strDrinkThumb}
                      className="drink-image"
                      alt="Drink"
                    />
                  </div>
                </div>
                <div className="more-btn" key={drink.idDrink}>
                  <button className="btn-more" onClick={() => openModal(drink)}>
                    More
                  </button>
                </div>
              </li>
            ))}

            {idActive && (
              <div className="show-drinks-card" ref={modalRef}>
                <div className="show-drinks-content">
                  <h2>{idActive.strDrink}</h2>
                  <div className="glass">
                    <h3>Glass:</h3>
                    <p>{idActive.strGlass}</p>
                  </div>
                  <div className="ingredients">
                    <h3>Ingredients:</h3>
                    <ul>
                      <li>{idActive.strIngredient1}</li>
                      <li>{idActive.strIngredient2}</li>
                      <li>{idActive.strIngredient3}</li>
                      <li>{idActive.strIngredient4}</li>
                      <li>{idActive.strIngredient5}</li>
                      <li>{idActive.strIngredient6}</li>
                      <li>{idActive.strIngredient7}</li>
                      <li>{idActive.strIngredient8}</li>
                      <li>{idActive.strIngredient9}</li>
                      <li>{idActive.strIngredient10}</li>
                    </ul>
                  </div>

                  <div className="instructions">
                    <h3>Instructions:</h3>
                    <p>{idActive.strInstructions}</p>
                  </div>

                  <div className="close-btn">
                    <button onClick={closeModal}>Close</button>
                  </div>
                </div>
              </div>
            )}
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
                    <img
                      src={drink.strDrinkThumb}
                      className="drink-image"
                      alt="Drink"
                    />
                  </div>
                </div>

                <div className="more-btn" key={drink.idDrink}>
                  <button onClick={() => openModal(drink)} className="btn-more">
                    More
                  </button>
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
