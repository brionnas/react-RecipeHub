// src/pages/Cookbook.js
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatsGrid from '../components/StatsGrid';
import MealPlanner from '../components/MealPlanner';
import CookbookSidebar from '../components/Sidebar';
import RecipeGrid from '../components/RecipeGrid'; // Swapped component
import '../css/Cookbook.css';

const Cookbook = () => {
  const [shoppingList, setShoppingList] = useState([
    { id: 1, text: 'Fresh basil', completed: true },
    { id: 2, text: 'Tomatoes', completed: false },
    { id: 3, text: 'Mozzarella cheese', completed: false },
    { id: 4, text: 'Olive oil', completed: true },
    { id: 5, text: 'Garlic', completed: false },
    { id: 6, text: 'Chicken breast', completed: false },
    { id: 7, text: 'Basmati rice', completed: false },
    { id: 8, text: 'Heavy cream', completed: false }
  ]);

  const handleAddShoppingItem = (text) => {
    const newItem = {
      id: Date.now(),
      text,
      completed: false
    };
    setShoppingList([...shoppingList, newItem]);
  };

  const handleToggleShoppingItem = (id) => {
    setShoppingList(
      shoppingList.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleRemoveShoppingItem = (id) => {
    setShoppingList(shoppingList.filter(item => item.id !== id));
  };

  return (
    <>
      <Header />

      <section className="page-header">
        <div className="container">
          <h1>My Cookbook</h1>
          <p>Welcome back, Chef! Manage your recipes, plan meals, and track your culinary journey.</p>
        </div>
      </section>

      <main>
        <div className="container">
          <StatsGrid />

          <div className="cookbook-two-col">
            <div className="cookbook-main">
              <RecipeGrid /> {/* Display recipes here */}
              <MealPlanner />
            </div>

            <CookbookSidebar 
              shoppingList={shoppingList}
              onAddShoppingItem={handleAddShoppingItem}
              onToggleShoppingItem={handleToggleShoppingItem}
              onRemoveShoppingItem={handleRemoveShoppingItem}
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Cookbook;

