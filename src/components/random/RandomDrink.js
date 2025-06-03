import {useState, useEffect} from 'react';
import './RandomDrink.css';

function RandomDrink(){

    const [randomDrink, setRandomDrink] = useState([]);

    const urlRandom = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    
    useEffect(() => {
        const fetchRandomDrink = async () => {
        try{
            const response = await fetch(urlRandom);
            const data = await response.json();

            setRandomDrink(data.drinks);
            console.log(data.drinks)
        }
        catch(error){console.error("Error fetching random drink api", error)}
    }

    fetchRandomDrink();
    }, []);

    return(
        <div></div>
    );
}

export default RandomDrink;