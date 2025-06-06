import './Header.css';
import { Link, Element } from 'react-scroll';

function Header(){

    return(
        <div className='header'>

            <div className='nav'>
                
                <ul className='nav-links'>
                    <li><Link >Home</Link></li>
                    <li><Link src="/">Drinks</Link></li>
                    <li><Link to='categories' smooth={true} duration={500}>Categories</Link></li>
                    <li><Link to='random_drink' smooth={true} duration={500}>Random drink</Link></li>
                </ul>

                <div className='search'>
                    <input type='text' placeholder='Search...' className='search-placeholder'/>
                    <button className='search-btn'>Search</button>
                </div>
            </div>

        </div>
    );
}

export default Header;