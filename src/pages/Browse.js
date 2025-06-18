import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import FiltersSection from '../components/FiltersSection';
import RecipeGrid from '../components/RecipeGrid';
import LoadMoreButton from '../components/LoadMoreButton';
import RecipeModal from '../components/RecipeModal';
import { useLocation } from 'react-router-dom';
import '../css/Browse.css';

const Browse = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

 const location = useLocation();

useEffect(() => {
  fetchRecipes();
}, [location.search]);


  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://recipehub-serverside.onrender.com/api/recipes");

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();
      setRecipes(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching recipes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  const handleLoadMore = () => {
    console.log('Load more recipes');
  };

  return (
    <>
      <Header />
      <main>
        <PageHeader 
          title="Browse Recipes" 
          subtitle="Discover thousands of delicious recipes from our community" 
        />

        <div className="container">
          {loading && (
            <div className="loading-container">
              <div className="loading"></div>
              <p>Loading recipes...</p>
            </div>
          )}

          {error && (
            <div className="error-container">
              <p>Error loading recipes: {error}</p>
              <button onClick={fetchRecipes} className="btn btn-primary">
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              <FiltersSection />
              <RecipeGrid recipes={recipes} onRecipeClick={handleRecipeClick} />
              <LoadMoreButton onLoadMore={handleLoadMore} />
            </>
          )}
        </div>

        <RecipeModal 
          recipe={selectedRecipe}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </main>
      <Footer />
    </>
  );
};

export default Browse;

