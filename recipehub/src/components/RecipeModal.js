import React from 'react';
import './RecipeModal.css';

const RecipeModal = ({ recipe, isOpen, onClose }) => {
  React.useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !recipe) return null;

  return (
    <div className="modal" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button 
          className="close-button" 
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2>{recipe.title}</h2>

        <img 
          src={`images/${recipe.img_name}`} 
          alt={recipe.title}
          onError={(e) => {
            e.target.src = '/images/placeholder-recipe.jpg';
          }}
        />

        <p className="recipe-description">{recipe.description}</p>

        <div className="recipe-details">
          <p><strong>Prep Time:</strong> {recipe.prep_time} minutes</p>
          <p><strong>Rating:</strong> <span className="rating">★ {recipe.rating}</span></p>
        </div>

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={() => console.log('Save clicked')}>
            <i className="fas fa-heart"></i> Save Recipe
          </button>
          <button className="btn btn-secondary" onClick={() => console.log('Share clicked')}>
            <i className="fas fa-share"></i> Share Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
