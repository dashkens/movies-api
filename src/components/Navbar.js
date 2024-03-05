import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav >
            <Link to="/"><h1>Movies</h1></Link>
            <div className="links">
                <NavLink to ="/">Home</NavLink>
                <NavLink to ="/favorites">My Favorites</NavLink>
            </div> 
        </nav>
    );
}

export default Navbar