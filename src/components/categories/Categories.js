import "./Categories.css";
import { useEffect, useState } from "react";
import { Element } from "react-scroll";


function Categories() {
  const urlCategories =
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(urlCategories);
        if(!response.ok){
          throw new Error('Error in API response');
        }
        const data = await response.json();

        setCategories(data.drinks);
        console.log(data.drinks);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h1 className="categories-title">Categories</h1>

      <Element name="categories" className="container-categories">
        <ul className="categories-ul">
            {categories?.map((category, index) => (
                <li key={index} className="category-li">
                    <div className="category-title">
                        <a href="/">{category.strCategory}</a>
                    </div>
                </li>
            ))}
        </ul>
      </Element>
    </div>
  );
}

export default Categories;
