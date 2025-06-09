import {useState, useEffect} from "react";


function CocktailCategory() {

  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);
  const [drinks, setDrinks] = useState({});
  const [Loading, setLoading] = useState(false);
  

  const urlCategories = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=List";
  
  useEffect(() => {
    const fetchCategories = async () => {
    try{
      const response = await fetch(urlCategories);
      if(!response.ok){
        throw new Error("Failure on response from API");
      }

      const data = await response.json();
      console.log(data);
    }
    catch(error){
      console.error("Error fetching categories:", error);
    }
    }

    fetchCategories();
}, []);
  
  return <div></div>;
}

export default CocktailCategory;
