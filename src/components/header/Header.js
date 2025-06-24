import './Header.css';
import { Link as ScrollLink , Element } from 'react-scroll';
import { Link as RouterLink, useLocation} from 'react-router-dom';
import {React, useEffect, useState, useRef } from 'react';
import axios from 'axios';

function Header(){

    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isDrinksPage = location.pathname === '/drinks';

    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [idActive, setIdActive] = useState(null);
    const modalRef = useRef(null);
    const suggestionsRef = useRef(null);
    

    const fetchSuggestions = async (term) => {

        if(!term.trim()){
            setSuggestions([]);
            return;
        }

        try{
            const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`);
            
            const filtered = (res.data.drinks || []).filter((drink) => 
             drink.strDrink.toLowerCase().startsWith(term.toLowerCase()));

            setSuggestions(filtered);
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
    const closeSuggestions = () => setSuggestions([]);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            const clickOutsideModal = modalRef.current && !modalRef.current.contains(event.target);
            const clickOutsideSuggestions = suggestionsRef.current && !suggestionsRef.current.contains(event.target);

            if(clickOutsideModal) closeModal() 
            if(clickOutsideSuggestions) closeSuggestions()
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

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

                <div className='search' ref={suggestionsRef}>
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
                                    <img src={drink.strDrinkThumb} className='search-img' alt='drink'/>
                                    <h2 className='search-drink'>{drink.strDrink}</h2>
                                </li>
                            ))}
                        </ul>
                    )}
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
                </div>
            </nav>

        </div>
    );
}

export default Header;