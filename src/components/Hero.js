import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <h1>Discover & Share Amazing Recipes</h1>
        <p>Join our community of food lovers and explore thousands of delicious recipes from around the world</p>
        <a href="/browse" className="cta-button">
          <i className="fas fa-search"></i>
          Start Exploring
        </a>
      </div>
    </section>
  );
};

export default Hero;