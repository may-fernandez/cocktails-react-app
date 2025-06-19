import { React, useState, useEffect, useRef } from "react";
import axios from "axios";

function NonAlcoholic() {
  const [naDrinks, setNaDrinks] = useState([]);
  const urlNaDrinks =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";

  const [show, setShow] = useState(false);
  const [idActive, setIdActive] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await fetch(urlNaDrinks);
        if (!response.ok) {
          throw new Error("Error un API response");
        }

        const data = await response.json();
        setNaDrinks(data.drinks.slice(0, 4));
        console.log(data.drinks.slice(0, 4));
      } catch (error) {
        console.error("Error fetching non-alcoholic drinks:", error);
      }
    };

    fetchDrinks();
  }, []);

  const openModal = async (drink) => {
    try{
        const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`);
        const detailedData = res.data.drinks[0];
        setIdActive(detailedData || null);
    }
    catch(error){
        console.error("Error opening modal: ", error);
        setIdActive(null);
    }
  }
  const closeModal = () => setIdActive(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <h1 className="title">Non-alcoholic Drinks</h1>

      <div className="drinks">
        <ul className="drinks-ul">
          {naDrinks?.map((drink) => (
            <li key={drink.idDrink} className="drink-card">
              <div>
                <div className="card-titles">
                  <h2>{drink.strDrink}</h2>
                </div>

                <div className="drink-content">
                  <img
                    src={drink.strDrinkThumb}
                    className="drink-image"
                    alt="drink"
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
      </div>
    </div>
  );
}

export default NonAlcoholic;
