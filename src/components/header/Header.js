import React from 'react';
import './Header.css';
import logo_drinks from '../../assets/logo_drinks.svg';

function Header(){

    return(
        <div className='header'>

            <div className='nav'>
                
                <ul className='nav-links'>
                    <li><a src="/">Home</a></li>
                    <li><a src="/">Drinks</a></li>
                    <li><a src="/">Categories</a></li>
                    <li><a src="/">Random drink</a></li>
                </ul>

                <div>
                    <input type='text' placeholder='Search...' className='search'/>
                    <button className='search-btn'>Search</button>
                </div>
            </div>

        </div>
    );
}

export default Header;