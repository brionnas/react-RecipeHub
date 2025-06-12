import React from 'react';
import RecipeCard from './RecipeCard';
import './RecipeGrid.css';

const RecipeGrid = ({ recipes, onRecipeClick }) => {
  if (!recipes || recipes.length === 0) {
    return (
      <section className="recipes-grid">
        <div className="no-recipes">
          <p>No recipes found. Try adjusting your filters.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="recipes-grid">
      <div className="grid-3">
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={recipe.id || index}
            recipe={recipe}
            onClick={() => onRecipeClick(recipe)}
          />
        ))}
      </div>
    </section>
  );
};

export default RecipeGrid;