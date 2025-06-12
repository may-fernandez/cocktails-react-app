import './Header.css';
import { Link as ScrollLink , Element } from 'react-scroll';
import { Link as RouterLink, useLocation} from 'react-router-dom';

function Header(){

    const location = useLocation();
    const isHomePage = Location.pathname === '/';
    const isCategoriesPage = Location.pathname === '/categories';

    return(
        <div className='header'>

            <div className='nav'>
                
                <ul className='nav-links'>
                    <li><RouterLink to='/'>Home</RouterLink></li>
                    <li><RouterLink>Drinks</RouterLink></li>
                    <li><ScrollLink to='categories' smooth={true} duration={500}>Categories</ScrollLink></li>
                    <li><ScrollLink to='random_drink' smooth={true} duration={500}>Random drink</ScrollLink></li>
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