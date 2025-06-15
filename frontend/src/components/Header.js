import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Header.css";
import logo from "./images/logo.jpg";
import profile from "./images/profile-icon.jpg";

const Header = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(!!localStorage.getItem("token"));
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();  

  useEffect(() => {
    setUserLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserLoggedIn(false);
    setDropdownVisible(false); 
    navigate("/"); 
  };

  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  if (userLoggedIn) {
    console.log("User is logged in!");
  }
  
  return (
    <header className="header">
      <nav>
        <div className="nav__header">
          <div className="nav__logo">
            <Link to="/home">
              <img
                src={logo}
                alt="logo"
                className="nav__logo"
              />
            </Link>
          </div>
          <Link to="/home">
            <div className="nav__title">RICE BOWL</div>
          </Link>
        </div>
        <ul className="nav__links" id="nav-links">
          <li><Link to="/home">HOME</Link></li>
          <li><Link to="/menu">MENU</Link></li>
          <li><Link to="/cart">CART</Link></li>
          <li><Link to="/contact">CONTACT US</Link></li>
          <li className="profile-dropdown">
            <img
              src={profile}
              alt="Profile"
              className="profile-image"
              onClick={toggleDropdown}
              title="Click to toggle menu"
            />
            {dropdownVisible && (
              <div className="dropdown-menu">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
