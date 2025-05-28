import "./Categories.css";
import { useEffect, useState } from "react";

function Categories() {
  const urlCategories =
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(urlCategories);
        const data = await response.json();

        setCategories(data.drinks.slice(0, 4));
        console.log(data.drinks.slice(0, 4));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h2 className="title">Categories</h2>

      <div className="container-categories">
        <ul className="categories-ul">
            {categories?.map((category, index) => (
                <li key={index} className="category-li">
                    <div className="category-title">
                        <h2>{category.strCategory}</h2>
                    </div>
                </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Categories;
