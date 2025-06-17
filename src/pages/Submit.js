import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Submit.css';

const Submit = () => {
  return (
    <>
      <Header />
      <main>
        <section className="page-header">
          <div className="container">
            <h1>Submit Your Recipe</h1>
            <p>Share your delicious creations with the RecipeHub community</p>
          </div>
        </section>

        <section className="container">
          <form className="submit-form">
            <div className="form-group">
              <label htmlFor="title">Recipe Title</label>
              <input type="text" id="title" name="title" required />
            </div>
            <div className="form-group">
              <label htmlFor="description">Short Description</label>
              <textarea id="description" name="description" rows="3" required></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="ingredients">Ingredients (comma separated)</label>
              <textarea id="ingredients" name="ingredients" rows="3" required></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="instructions">Instructions</label>
              <textarea id="instructions" name="instructions" rows="5" required></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="image">Image URL</label>
              <input type="url" id="image" name="image" required />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select id="category" name="category" required>
                <option value="">Select category</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
              </select>
            </div>
            <button type="submit" className="btn">Submit Recipe</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Submit;
