import "./Footer.css";
import logo_drinks from "../../assets/logo_drinks.svg";
import { useState, useEffect } from "react";

function Footer() {
  const [footerCategories, setFooterCategories] = useState([]);

  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error in API response");
        }

        const data = await response.json();

        setFooterCategories(data.drinks);
        console.log(data.drinks);
      } catch (error) {
        console.error("Error fetching al categories: ", error);
      }
    };

    fetchAllCategories();
  }, []);

  return (
    <div>
      <div className="footer">
          <div className="logo">
            <img src={logo_drinks} />
          </div>

          <div className="footer-categories">
            <h2>Categories</h2>
            <ul className="categories-ul">
              {footerCategories?.map((category, index) => (
                <li key={index} className="categories-li">
                  {category.strCategory}
                </li>
              ))}
            </ul>
          </div>
        </div>
    </div>
  );
}

export default Footer;
