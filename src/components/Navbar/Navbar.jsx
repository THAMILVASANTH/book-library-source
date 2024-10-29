import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import logoImg from "../../images/book.gif";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Hook to navigate

  // Check authentication status on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('user') !== null; // Check if user exists
    setIsAuthenticated(authStatus);
  }, []);

  const handleNavbar = () => setToggleMenu(!toggleMenu);

  const handleLogout = () => {
    // Clear user from local storage on logout
    localStorage.removeItem('user'); // Clear user info
    setIsAuthenticated(false); // Update local state
    navigate('/login'); // Navigate to login page after logout
  };

  return (
    <nav className='navbar' id="navbar">
      <div className='container navbar-content flex'>
        <div className='brand-and-toggler flex flex-sb'>
          <Link to="/" className='navbar-brand flex'>
            <img src={logoImg} alt="site logo" />
            <span className='text-uppercase fw-7 fs-24 ls-1'>bookheaven</span>
          </Link>
          <button type="button" className='navbar-toggler-btn' onClick={handleNavbar}>
            <HiOutlineMenuAlt3 size={35} style={{
              color: `${toggleMenu ? "#fff" : "#010101"}`
            }} />
          </button>
        </div>

        <div className={toggleMenu ? "navbar-collapse show-navbar-collapse" : "navbar-collapse"}>
          <ul className="navbar-nav">
            <li className='nav-item'>
              <Link to="/book" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Home</Link>
            </li>
            <li className='nav-item'>
              <Link to="/about" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>About</Link>
            </li>
            {isAuthenticated ? (
              <li className='nav-item'>
                <button onClick={handleLogout} className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Logout</button>
              </li>
            ) : (
              <li className='nav-item'>
                <Link to="/login" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Login / Sign Up</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
