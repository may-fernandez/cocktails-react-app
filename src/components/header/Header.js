import './Header.css';

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

                <div className='search'>
                    <input type='text' placeholder='Search...' className='search-placeholder'/>
                    <button className='search-btn'>Search</button>
                </div>
            </div>

        </div>
    );
}

export default Header;