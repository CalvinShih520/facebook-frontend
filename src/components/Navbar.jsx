import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <nav className="navbar">
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
            <Link to='/products'>Procducts</Link>
        </nav>
    );
};

export default Navbar
