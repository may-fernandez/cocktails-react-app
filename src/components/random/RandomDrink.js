import { useState, useEffect, useRef} from "react";
import "./RandomDrink.css";

function RandomDrink() {
  const [randomDrink, setRandomDrink] = useState(null);
  const [visible, setVisible] = useState(false);
  const [btnActive, setBtnActive] = useState(null);
  const modalRef = useRef(null);

  const urlRandom = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

  const fetchRandomDrink = async () => {
    try {
      const response = await fetch(urlRandom);
      if (!response.ok) {
        throw new Error("Error in API response");
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

  const openModal = (item) => setBtnActive(item);
  const closeModal = () => setBtnActive(null);

  useEffect(() => {

    const handleClickOutside = (event) =>{

      if(modalRef.current && !modalRef.current.contains(event.target)){
        closeModal();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  // strCategory, strDrink: Nombre del trago, strGlass: vaso, strIngredient1-15, strInstructions

  return (
    <div>
      <h1 className="title">Random Drink</h1>
      <div className="rand-drink-container">
        <div className="rand-instructions">
          <div id="container-title">
            <h2>Lookup a random cocktail</h2>
            <p>Click the button bellow to get a random cocktail from our drinks list.</p>
          </div>
          <div id="btn-get">
            <button onClick={fetchRandomDrink}>
            {randomDrink ? "Get new cocktail" : "Get cocktail"}
          </button>
          </div>
          
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

            <div className="more-btn" key={randomDrink.idDrink}>
              <button className="btn-more" onClick={() => {openModal(randomDrink)}}>More</button>
            </div>
          </div>
        )}

        {btnActive && (
          <div className="show-drink-modal" ref={modalRef}>
            <div className="show-modal-content">
                  <h2>{btnActive.strDrink}</h2>
                  <div className="modal-glass">
                    <h3>Glass:</h3>
                    <p>{btnActive.strGlass}</p>
                  </div>
                  <div className="modal-ingredients">
                    <h3>Ingredients:</h3>
                    <ul>
                      <li>{btnActive.strIngredient1}</li>
                      <li>{btnActive.strIngredient2}</li>
                      <li>{btnActive.strIngredient3}</li>
                      <li>{btnActive.strIngredient4}</li>
                      <li>{btnActive.strIngredient5}</li>
                      <li>{btnActive.strIngredient6}</li>
                      <li>{btnActive.strIngredient7}</li>
                      <li>{btnActive.strIngredient8}</li>
                      <li>{btnActive.strIngredient9}</li>
                      <li>{btnActive.strIngredient10}</li>
                    </ul>
                  </div>

                  <div className="modal-instructions">
                    <h3>Instructions:</h3>
                    <p>{btnActive.strInstructions}</p>
                  </div>

                  <div className="modal-close-btn">
                    <button onClick={closeModal}>Close</button>
                  </div>
                </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RandomDrink;
