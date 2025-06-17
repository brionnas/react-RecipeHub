import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onClick }) => {
  const handleCardClick = () => {
    if (onClick) onClick(recipe);
  };

  const handleSaveClick = (e) => {
    e.stopPropagation();
    console.log('Save recipe:', recipe.title);
   
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    console.log('Share recipe:', recipe.title);
    
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }

    return stars;
  };

  return (
    <div className="card recipe-card" onClick={handleCardClick}>
      <img
        src={recipe.image || `images/${recipe.img_name}`}
        alt={recipe.title}
        onError={(e) => { e.target.src = '/images/placeholder-recipe.jpg'; }}
      />
      <div className="card-content">
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
        <div className="card-meta">
          <span><i className="fas fa-clock"></i> {recipe.time || recipe.prep_time} min</span>
          <span className="rating">
            {renderStars(recipe.rating)} {recipe.rating}
          </span>
        </div>
        <div className="card-actions">
          <button 
            className="action-btn save-btn"
            onClick={handleSaveClick}
            aria-label="Save recipe"
          >
            <i className="fas fa-heart"></i> Save
          </button>
          <button 
            className="action-btn share-btn"
            onClick={handleShareClick}
            aria-label="Share recipe"
          >
            <i className="fas fa-share"></i> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
