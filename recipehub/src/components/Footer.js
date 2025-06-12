import React from "react";
import './Footer.css';

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="logo"><i className="fas fa-utensils"></i> RecipeHub</div>
        <p>Bringing food lovers together, one recipe at a time.</p>
        <div className="social-links">
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
        </div>
        <p className="copyright">© 2024 RecipeHub. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
