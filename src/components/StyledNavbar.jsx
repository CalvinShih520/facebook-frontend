import { NavLink, Link } from "react-router-dom";

const StyleNavbar = ({ currentUser, logOut }) => {
  return (
    <nav className="navbar">
      <NavLink to='/' className={({ isActive }) => (isActive ? 'link active' : 'link')}>Home</NavLink>
      <NavLink to='/about' className={({ isActive }) => (isActive ? 'link active' : 'link')}>About</NavLink>
      <NavLink to='/products' className={({ isActive }) => (isActive ? 'link active' : 'link')}>Products</NavLink>
      {currentUser && (
        <>
          <NavLink to='/postprivate' className={({ isActive }) => (isActive ? 'link active' : 'link')}>Private</NavLink>
          <NavLink to='/friends' className={({ isActive }) => (isActive ? 'link active' : 'link')}>Friends</NavLink>
          <NavLink to='/search-friends' className={({ isActive }) => (isActive ? 'link active' : 'link')}>Search Friends</NavLink>
          <NavLink to='/friend-requests' className={({ isActive }) => (isActive ? 'link active' : 'link')}>Friend Requests</NavLink>
        </>
      )}
      {currentUser ? (
        <a href="/login" className="link" onClick={logOut}>Logout</a>
      ) : (
        <>
          <NavLink to='/login' className={({ isActive }) => (isActive ? 'link active' : 'link')}>Login</NavLink>
          <NavLink to='/signup' className={({ isActive }) => (isActive ? 'link active' : 'link')}>Sign up</NavLink>
        </>
      )}
    </nav>
  );
};

export default StyleNavbar;
