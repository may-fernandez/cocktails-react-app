import './Header.css';
import { Link as ScrollLink , Element } from 'react-scroll';
import { Link as RouterLink, useLocation} from 'react-router-dom';
import {React, useEffect, useState, useRef } from 'react';
import axios from 'axios';

function Header(){

    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isDrinksPage = Location.pathname === '/drinks';

    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [idActive, setIdActive] = useState(null);
    const modalRef = useRef(null);

    const fetchSuggestions = async (term) => {

        if(!term.trim()){
            setSuggestions([]);
            return;
        }

        try{
            const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`);
            setSuggestions(res.data.drinks || []);
        }
        catch(error){
            console.error("Error fetching suggestions: ", error);
            setSuggestions([]);
        }
    }

    const openModal = async (drink) => {
        try{
            const res = await axios.get
            (`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`);

            const detailedDrink = res.data.drinks[0];
            setIdActive(detailedDrink || null);
        }
        catch(error){
            console.error("Error fetching drink: ", error);
            setIdActive(null);
        }
    } 


    const closeModal = () => setIdActive(null); 
    

    const handleSelectDrink = async (drink) => {
        setSuggestions([]);
        setSearchTerm("");
        await openModal(drink);
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
                    <input 
                    type='text' 
                    placeholder='Search...' 
                    className='search-placeholder' 
                    value={searchTerm}
                    onChange={(e) => {
                        const term = e.target.value;
                        setSearchTerm(term);
                        fetchSuggestions(term);
                    }}/>
                    {suggestions.length > 0 && (
                        <ul className='suggestions-list'>
                            {suggestions.map((drink) => (
                                <li key={drink.idDrink} onClick={() => handleSelectDrink(drink)} className='suggestions-items'>
                                    <img src={drink.strDrinkThumb} className='search-img'/>
                                    <h2 className='search-drink'>{drink.strDrink}</h2>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </nav>

        </div>
    );
}

export default Header;