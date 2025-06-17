import React from "react";
import { Link, useLocation } from "react-router-dom";
import './Header.css';


function Header() {
  const { pathname } = useLocation();

  return (
    <header>
      <div className="container">
        <div className="nav-container">
          <div className="logo">
            <i className="fas fa-utensils"></i> RecipeHub
          </div>
          <nav id="mainNav">
            <ul>
              <li><Link to="/" className={pathname === "/" ? "active" : ""}>Home</Link></li>
              <li><Link to="/browse" className={pathname === "/browse" ? "active" : ""}>Browse Recipes</Link></li>
              <li><Link to="/cookbook" className={pathname === "/cookbook" ? "active" : ""}>My Cookbook</Link></li>
              <li><Link to="/submit" className={pathname === "/submit" ? "active" : ""}>Submit Recipe</Link></li>
              <li><Link to="/admin" className={pathname === "/admin" ? "active" : ""}>Admin Dashboard</Link></li>
              <li><Link to="/contact" className={pathname === "/contact" ? "active" : ""}>Contact</Link></li>
            </ul>
          </nav>
          <button className="mobile-menu-toggle" id="mobileMenuToggle">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;