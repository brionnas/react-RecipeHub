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
      setError(null);
      
      // Add timeout and better error handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch("https://recipehub-serverside.onrender.com/api/recipes", {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        // Handle different HTTP error codes
        if (response.status === 400) {
          throw new Error('Bad request - please check your data format');
        } else if (response.status === 404) {
          throw new Error('Recipes not found - the endpoint may have changed');
        } else if (response.status === 500) {
          throw new Error('Server error - please try again later');
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      }
      
      const data = await response.json();
      setRecipes(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request timed out. Please check your internet connection and try again.');
      } else if (err.message.includes('Failed to fetch')) {
        setError('Network error. Please check your internet connection and try again.');
      } else {
        setError(err.message);
      }
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const res = await fetch(`https://recipehub-serverside.onrender.com/api/recipes/${id}`, {
        method: 'DELETE',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      clearTimeout(timeoutId);
      
      if (res.ok) {
        setRecipes(prev => prev.filter(r => r._id !== id));
        handleCloseModal();
        alert("✅ Recipe deleted!");
      } else {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${res.status}: Delete failed`);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        alert("❌ Request timed out. Please try again.");
      } else {
        alert(`❌ Error deleting recipe: ${err.message}`);
      }
      console.error("Delete error:", err);
    }
  };

  const handleEdit = async (updatedRecipe) => {
    try {
      console.log('Editing recipe with data:', updatedRecipe);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      // Ensure we're sending the correct ID in the URL
      const recipeId = selectedRecipe._id;
      
      // Create clean payload that matches server expectations exactly
      const cleanPayload = {
        title: updatedRecipe.title,
        description: updatedRecipe.description,
        prep_time: updatedRecipe.prep_time,
        rating: updatedRecipe.rating,
        img_name: updatedRecipe.img_name
      };
      
      console.log('Sending PUT request to:', `https://recipehub-serverside.onrender.com/api/recipes/${recipeId}`);
      console.log('With payload:', cleanPayload);
      
      const res = await fetch(`https://recipehub-serverside.onrender.com/api/recipes/${recipeId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(cleanPayload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log('Response status:', res.status);
      
      if (res.ok) {
        const responseData = await res.json();
        console.log('Update successful:', responseData);
        
        // Update the recipes list with the new data
        setRecipes(prev => prev.map(r => r._id === recipeId ? responseData : r));
        // Update the selected recipe for the modal
        setSelectedRecipe(responseData);
        
        return { success: true, data: responseData };
      } else {
        let errorMessage = `HTTP ${res.status}: Edit failed`;
        try {
          const errorData = await res.json();
          console.log('Error response:', errorData);
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (parseError) {
          console.log('Could not parse error response');
        }
        
        console.error('Edit failed with status:', res.status);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      console.error('Edit error:', err);
      
      if (err.name === 'AbortError') {
        return { success: false, error: 'Request timed out. Please try again.' };
      } else if (err.message.includes('Failed to fetch')) {
        return { success: false, error: 'Network error. Please check your connection and try again.' };
      } else {
        return { success: false, error: err.message || 'An unexpected error occurred' };
      }
    }
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
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </main>
      <Footer />
    </>
  );
};

export default Browse;









