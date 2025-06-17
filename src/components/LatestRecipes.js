import React from 'react';
import RecipeCard from './RecipeCard';
import './LatestRecipes.css';

const LatestRecipes = () => {
  const recipes = [
    {
      id: 1,
      title: "Mediterranean Quinoa Salad",
      description: "Fresh and healthy salad packed with Mediterranean flavors",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=200&fit=crop",
      time: "15 min",
      rating: 4.2
    },
    {
      id: 2,
      title: "Ultimate Beef Burger",
      description: "Juicy homemade burger with caramelized onions and special sauce",
      image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=200&fit=crop",
      time: "30 min",
      rating: 4.8
    },
    {
      id: 3,
      title: "Decadent Chocolate Cake",
      description: "Rich, moist chocolate cake with silky ganache frosting",
      image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&h=200&fit=crop",
      time: "45 min",
      rating: 4.9
    }
  ];

  return (
    <section className="latest-preview">
      <h2 className="section-title">Latest Recipes</h2>
      <p className="section-subtitle">Fresh recipes added by our community of passionate home cooks</p>
      
      <div className="grid-3">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <a href="/browse" className="btn">
          <i className="fas fa-arrow-right"></i>
          View All Recipes
        </a>
      </div>
    </section>
  );
};

export default LatestRecipes;