import React from 'react';
import './FeaturedRecipe.css';

const FeaturedRecipe = () => {
  return (
    <section className="featured">
      <h2 className="section-title">Featured Recipe of the Day</h2>
      <div className="featured-card">
        <img 
          src="https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&h=400&q=80" 
          alt="Delicious Italian Pasta with fresh basil and tomatoes"
        />
        <div className="featured-content">
          <h3>Authentic Italian Carbonara</h3>
          <p>A classic Roman pasta dish with eggs, cheese, pancetta, and pepper. This traditional recipe has been passed down through generations and delivers rich, creamy flavors that will transport you straight to Italy.</p>
          <div className="card-meta">
            <span><i className="fas fa-clock"></i> 25 minutes</span>
            <span><i className="fas fa-users"></i> Serves 4</span>
            <span className="rating">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              4.9 (127 reviews)
            </span>
          </div>
          <a href="#" className="btn">
            <i className="fas fa-arrow-right"></i>
            View Recipe
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipe;