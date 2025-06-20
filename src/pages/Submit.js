import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Submit.css';

const Submit = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prep_time: '',
    rating: '',
    img_name: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Client-side validation that matches server-side Joi schema
  const validateForm = () => {
    const newErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    // Prep time validation
    if (!formData.prep_time) {
      newErrors.prep_time = 'Prep time is required';
    } else {
      const prepTime = Number(formData.prep_time);
      if (isNaN(prepTime) || prepTime < 1) {
        newErrors.prep_time = 'Prep time must be at least 1 minute';
      }
    }

    // Rating validation
    if (!formData.rating) {
      newErrors.rating = 'Rating is required';
    } else {
      const rating = Number(formData.rating);
      if (isNaN(rating) || rating < 0 || rating > 5) {
        newErrors.rating = 'Rating must be between 0 and 5';
      }
    }

    // Image name validation
    if (!formData.img_name.trim()) {
      newErrors.img_name = 'Image filename is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setMessage('❌ Please fix the errors below.');
      return;
    }

    setIsSubmitting(true);
    setMessage('Submitting...');

    try {
      const newRecipe = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        prep_time: Number(formData.prep_time),
        rating: Number(formData.rating),
        img_name: formData.img_name.trim()
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch('https://recipehub-serverside.onrender.com/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const result = await response.json();

      if (response.ok) {
        setMessage('✅ Recipe submitted successfully!');
        setFormData({ 
          title: '', 
          description: '', 
          prep_time: '', 
          rating: '', 
          img_name: '' 
        });
        setErrors({});

        setTimeout(() => {
          navigate('/browse?refresh=true');
        }, 1500);
      } else {
        setMessage(`❌ ${result.error || 'Submission failed.'}`);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        setMessage('❌ Request timed out. Please try again.');
      } else if (error.message.includes('Failed to fetch')) {
        setMessage('❌ Network error. Please check your connection and try again.');
      } else {
        setMessage('❌ An unexpected error occurred. Please try again.');
      }
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="page-header">
          <div className="container">
            <h1>Submit Recipe</h1>
            <p>Add your own dish to RecipeHub's community board!</p>
          </div>
        </section>

        <section className="container">
          <form className="submit-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Recipe Title *</label>
              <input 
                type="text" 
                id="title" 
                value={formData.title} 
                onChange={handleChange} 
                className={errors.title ? 'error' : ''}
                disabled={isSubmitting}
                required 
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea 
                id="description" 
                rows="4" 
                value={formData.description} 
                onChange={handleChange}
                className={errors.description ? 'error' : ''}
                disabled={isSubmitting}
                required
              ></textarea>
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="prep_time">Prep Time (minutes) *</label>
              <input 
                type="number" 
                id="prep_time" 
                min="1"
                value={formData.prep_time} 
                onChange={handleChange}
                className={errors.prep_time ? 'error' : ''}
                disabled={isSubmitting}
                required 
              />
              {errors.prep_time && <span className="error-message">{errors.prep_time}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating (0-5) *</label>
              <input 
                type="number" 
                id="rating" 
                min="0" 
                max="5" 
                step="0.1"
                value={formData.rating} 
                onChange={handleChange}
                className={errors.rating ? 'error' : ''}
                disabled={isSubmitting}
                required 
              />
              {errors.rating && <span className="error-message">{errors.rating}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="img_name">Image Filename (e.g. pasta.jpg) *</label>
              <input 
                type="text" 
                id="img_name" 
                value={formData.img_name} 
                onChange={handleChange}
                className={errors.img_name ? 'error' : ''}
                disabled={isSubmitting}
                required 
              />
              {errors.img_name && <span className="error-message">{errors.img_name}</span>}
            </div>

            <button 
              type="submit" 
              className="btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Recipe'}
            </button>

            {message && (
              <p className={`status-message ${message.includes('✅') ? 'success' : 'error'}`}>
                {message}
              </p>
            )}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Submit;










