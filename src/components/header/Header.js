import './Header.css';
import { Link as ScrollLink , Element } from 'react-scroll';
import { Link as RouterLink, useLocation} from 'react-router-dom';
import {React, useEffect, useState } from 'react';

function Header(){

    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isDrinksPage = Location.pathname === '/drinks';

    const [inputText, setInputText] = useState("");

    const [drinks, setDrinks] = useState([]);
    const urlDrinks = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`;

   


    useEffect(() => {
        const fetchDrinks = async () => {
            try{
                const res = await fetch(urlDrinks)
                if(!res.ok){
                    throw new Error("Error in API response");
                }

                const data = await res.json();

                setDrinks(data.drinks);
                console.log(data.drinks);

            }
            catch(error){
                console.error("Error fetching drinks: ", error);
            }
        }

        fetchDrinks();
    }, []);

    const list = (props) => {

        return(
            <div>
                <ul>
                    {drinks.map((drink) => {
                        <li key={drink.idDrink}>{drink.strDrink}</li>
                    })}
                </ul>
            </div>
        );
    }

    let inputHandler = (e) => {
        let lowerCase = e.target.value.toLowerCase();

        setInputText(lowerCase);
    }

    return(
        <div className='header'>

            <nav className='nav'>
                
                <div className='nav-links'>
                    
                    <RouterLink to='/'>Home</RouterLink>
                    {isHomePage ? (
                        <>
                        <ScrollLink to='categories' smooth={true} duration={500}>Categories</ScrollLink>
                        <ScrollLink to='random_drink' smooth={true} duration={500}>Random drink</ScrollLink>
                        </>
                    ) : null}
                    <RouterLink to='/drinks'>Drinks</RouterLink>
                </div>

                <div className='search'>
                    <input type='text' placeholder='Search...' className='search-placeholder' onChange={inputHandler}/>
                    <button className='search-btn'>Search</button>
                </div>
            </nav>

        </div>
    );
}

export default Header;