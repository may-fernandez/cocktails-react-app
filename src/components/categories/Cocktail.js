import { useState, useEffect } from "react";
import axios from "axios";

function CocktailCategory() {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);
  const [drinks, setDrinks] = useState({});
  const [loading, setLoading] = useState(false);

  const urlCategories =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=List";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(urlCategories);
        if (!response.ok) {
          throw new Error("Failure on response from API");
        }

        const data = await response.json();

        setCategories(data.drinks.map((drink) => drink.strCategory));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
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

        results[category] = res.data.drinks;
      }

      setDrinks(results);
      setLoading(false);
    };

    fetchDrinks();
  }, [selected]);

  const toggleCategory = (cat) => {
    if (selected.includes(cat)) {
      setSelected((prev) =>
        prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
      );
    }
  };

  return (
    <div>
      {/* Category filter */}
      <aside className="aside-categories">
        <h3>Categories</h3>
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <label>
                <input
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
      <main>
        <h2>Drinks</h2>
        {loading && <p>Loading...</p>}
        {!loading && selected.length === 0 && (
          <p>Please select one or more categories to see drinks</p>
        )}
        {!loading &&
          Object.entries(drinks).map(([cat, drinksList]) => (
            <div key={cat}>
              <h3>{cat}</h3>
              <div>
                {drinksList.map((drink) => (
                  <div key={drink.idDrink}>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </main>
    </div>
  );
}

export default CocktailCategory;
