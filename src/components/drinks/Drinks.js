import "./Drinks.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function Drinks() {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);
  const [drinks, setDrinks] = useState({});
  const [glasses, setGlasses] = useState([]);
  const [idActive, setIdActive] = useState(null);
  const [loading, setLoading] = useState(false);

  const modalRef = useRef(null);

  const urlCategories =
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

  useEffect(() => {
    axios.get(urlCategories).then((res) => {
      const drinks = res.data.drinks;

      if (Array.isArray(drinks)) {
        setCategories(res.data.drinks.map((d) => d.strCategory));
      }
      else{
        setCategories([]);
      }
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
      setCategories([]);
    });

  }, []);

  

  useEffect(() => {
    if (selected.length === 0) {
      setDrinks({});
      return;
    }

    const fetchDrinks = async () => {
      setLoading(true);
      const results = {};

      for (const category of selected) {
        const res = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
            category
          )}`
        );

        results[category] = Array.isArray(res.data.drinks)
          ? res.data.drinks
          : [];
      }

      setDrinks(results);
      setLoading(false);
    };

    fetchDrinks();
  }, [selected]);

  const toggleCategory = (cat) => {
   
      setSelected((prev) =>
        prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
      );
    
  };

  

  const openModal = async (drink) => {
    try{
      const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`);
      const detailedDrink = res.data.drinks[0];
      setIdActive(detailedDrink || null)
    }
    catch(error){
      console.error("Error fetching drink details:", error);
      setIdActive(null);
    }
  };
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
    <div className="drinks-container">
      {/* Category filter */}
      <aside className="aside-categories">
        <h3>Categories</h3>
        <ul>
          {categories.map((category) => (
            <li key={category} className="checkbox-wrapper-13" htmlFor="c1-13">
              <label  id="checkbox-label">
                <input
                  id="c1-13"
                  type="checkbox"
                  checked={selected.includes(category)}
                  onChange={() => toggleCategory(category)}
                />
                {`${category}`}
              </label>
            </li>
          ))}
        </ul>
      </aside>

      {/* Drinks results */}
      <main id="drinks-main">
        <h3>Drinks</h3>
        {loading && <p>Loading...</p>}
        {!loading && selected.length === 0 && (
          <p>Please select one or more categories to see drinks</p>
        )}
        {!loading &&
          Object.entries(drinks).map(([cat, drinksList]) => (
            <div key={cat}>
              <h2>{cat}</h2>
              <div className="drinks-list">
                {drinksList.map((drink) => (
                  <div key={drink.idDrink} className="drink-card">
                    <div className="card-titles">
                      <h2>{drink.strDrink}</h2>
                    </div>

                    <div className="drink-content">
                      <img
                        src={drink.strDrinkThumb}
                        className="drink-image"
                        alt="Drink"
                      />
                    </div>

                    <div className="more-btn" key={drink.idDrink}>
                      <button
                        className="btn-more"
                        onClick={() => openModal(drink)}
                      >
                        More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        {idActive && (
          <div className="show-drinks-card" ref={modalRef}>
            <div className="show-drinks-content">
              <h2 className="modal-drink-name">{idActive.strDrink}</h2>
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
      </main>
    </div>
  );
}

export default Drinks;
