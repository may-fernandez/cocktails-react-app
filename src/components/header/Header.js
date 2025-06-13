import './Header.css';
import { Link as ScrollLink , Element } from 'react-scroll';
import { Link as RouterLink, useLocation} from 'react-router-dom';

function Header(){

    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isCategoriesPage = Location.pathname === '/categories';

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
                    <RouterLink to='/categories'>Drinks</RouterLink>
                </div>

                <div className='search'>
                    <input type='text' placeholder='Search...' className='search-placeholder'/>
                    <button className='search-btn'>Search</button>
                </div>
            </nav>

        </div>
    );
}

export default Header;