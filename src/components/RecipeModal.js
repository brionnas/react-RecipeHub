import React, { useState, useEffect } from 'react';
import './RecipeModal.css';

const RecipeModal = ({ recipe, isOpen, onClose, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [editStatus, setEditStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (recipe) {
      // Ensure all required fields are initialized with proper values
      setFormData({
        _id: recipe._id,
        title: recipe.title || '',
        description: recipe.description || '',
        prep_time: recipe.prep_time || '',
        rating: recipe.rating || '',
        img_name: recipe.img_name || ''
      });
      setErrors({});
      setEditStatus('');
    }
  }, [recipe]);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') onClose();
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
    if (e.target === e.currentTarget && !isSubmitting) onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: value 
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Comprehensive validation matching server-side Joi schema
  const validateForm = () => {
    const newErrors = {};

    // Title validation
    if (!formData.title || !formData.title.toString().trim()) {
      newErrors.title = 'Title is required';
    }

    // Description validation
    if (!formData.description || !formData.description.toString().trim()) {
      newErrors.description = 'Description is required';
    }

    // Prep time validation
    const prepTimeValue = formData.prep_time;
    if (prepTimeValue === '' || prepTimeValue === null || prepTimeValue === undefined) {
      newErrors.prep_time = 'Prep time is required';
    } else {
      const prepTime = Number(prepTimeValue);
      if (isNaN(prepTime) || prepTime < 1 || !Number.isInteger(prepTime)) {
        newErrors.prep_time = 'Prep time must be a whole number of at least 1 minute';
      }
    }

    // Rating validation
    const ratingValue = formData.rating;
    if (ratingValue === '' || ratingValue === null || ratingValue === undefined) {
      newErrors.rating = 'Rating is required';
    } else {
      const rating = Number(ratingValue);
      if (isNaN(rating) || rating < 0 || rating > 5) {
        newErrors.rating = 'Rating must be between 0 and 5';
      }
    }

    // Image name validation
    if (!formData.img_name || !formData.img_name.toString().trim()) {
      newErrors.img_name = 'Image filename is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitEdit = async () => {
    if (!validateForm()) {
      setEditStatus('❌ Please fix the errors below.');
      return;
    }

    setIsSubmitting(true);
    setEditStatus('Saving changes...');

    // Create clean payload that exactly matches server expectations
    const updatedRecipe = {
      title: formData.title.toString().trim(),
      description: formData.description.toString().trim(),
      prep_time: parseInt(formData.prep_time, 10), // Ensure integer
      rating: parseFloat(formData.rating), // Allow decimal ratings
      img_name: formData.img_name.toString().trim()
    };

    // Validate final payload before sending
    if (!updatedRecipe.title || !updatedRecipe.description || !updatedRecipe.img_name) {
      setEditStatus('❌ All fields are required.');
      setIsSubmitting(false);
      return;
    }

    if (updatedRecipe.prep_time < 1 || isNaN(updatedRecipe.prep_time)) {
      setEditStatus('❌ Prep time must be at least 1 minute.');
      setIsSubmitting(false);
      return;
    }

    if (updatedRecipe.rating < 0 || updatedRecipe.rating > 5 || isNaN(updatedRecipe.rating)) {
      setEditStatus('❌ Rating must be between 0 and 5.');
      setIsSubmitting(false);
      return;
    }

    console.log('Sending recipe update:', updatedRecipe);

    try {
      const result = await onEdit(updatedRecipe);
      
      if (result && result.success !== false) {
        setEditStatus('✅ Recipe updated successfully!');
        setIsEditing(false);
        setErrors({});
        setTimeout(() => setEditStatus(''), 3000);
      } else {
        setEditStatus(`❌ Failed to update recipe: ${result?.error || 'Unknown error'}`);
      }
    } catch (error) {
      setEditStatus('❌ An error occurred while updating the recipe.');
      console.error('Edit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form data to original recipe values
    if (recipe) {
      setFormData({
        _id: recipe._id,
        title: recipe.title || '',
        description: recipe.description || '',
        prep_time: recipe.prep_time || '',
        rating: recipe.rating || '',
        img_name: recipe.img_name || ''
      });
    }
    setErrors({});
    setEditStatus('');
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this recipe? This action cannot be undone.")) {
      onDelete(recipe._id);
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
          disabled={isSubmitting}
        >
          &times;
        </button>

        {isEditing ? (
          <>
            <h2>Edit Recipe</h2>
            <div className="edit-form">
              <div className="form-group">
                <label htmlFor="edit-title">Title *</label>
                <input 
                  type="text" 
                  id="edit-title"
                  name="title" 
                  value={formData.title || ''} 
                  onChange={handleInputChange} 
                  placeholder="Recipe title"
                  className={errors.title ? 'error' : ''}
                  disabled={isSubmitting}
                />
                {errors.title && <span className="error-message">{errors.title}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="edit-description">Description *</label>
                <textarea 
                  id="edit-description"
                  name="description" 
                  value={formData.description || ''} 
                  onChange={handleInputChange} 
                  placeholder="Recipe description"
                  rows="4"
                  className={errors.description ? 'error' : ''}
                  disabled={isSubmitting}
                />
                {errors.description && <span className="error-message">{errors.description}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="edit-prep-time">Prep Time (minutes) *</label>
                <input 
                  type="number" 
                  id="edit-prep-time"
                  name="prep_time" 
                  min="1" 
                  step="1"
                  value={formData.prep_time || ''} 
                  onChange={handleInputChange} 
                  placeholder="Prep time in minutes"
                  className={errors.prep_time ? 'error' : ''}
                  disabled={isSubmitting}
                />
                {errors.prep_time && <span className="error-message">{errors.prep_time}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="edit-rating">Rating (0-5) *</label>
                <input 
                  type="number" 
                  id="edit-rating"
                  name="rating" 
                  step="0.1" 
                  min="0" 
                  max="5" 
                  value={formData.rating || ''} 
                  onChange={handleInputChange} 
                  placeholder="Rating between 0 and 5"
                  className={errors.rating ? 'error' : ''}
                  disabled={isSubmitting}
                />
                {errors.rating && <span className="error-message">{errors.rating}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="edit-img-name">Image Filename *</label>
                <input 
                  type="text" 
                  id="edit-img-name"
                  name="img_name" 
                  value={formData.img_name || ''} 
                  onChange={handleInputChange} 
                  placeholder="e.g. pasta.jpg"
                  className={errors.img_name ? 'error' : ''}
                  disabled={isSubmitting}
                />
                {errors.img_name && <span className="error-message">{errors.img_name}</span>}
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="btn btn-primary" 
                onClick={handleSubmitEdit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={handleCancelEdit}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
            
            {editStatus && (
              <p className={`status-message ${editStatus.includes('✅') ? 'success' : 'error'}`}>
                {editStatus}
              </p>
            )}
          </>
        ) : (
          <>
            <h2>{recipe.title}</h2>
            <div className="recipe-image-container">
              <img
                src={`images/${recipe.img_name}`}
                alt={recipe.title}
                onError={(e) => { e.target.src = '/images/placeholder-recipe.jpg'; }}
              />
            </div>
            <p className="recipe-description">{recipe.description}</p>
            <div className="recipe-details">
              <p><strong>Prep Time:</strong> {recipe.prep_time} minutes</p>
              <p><strong>Rating:</strong> <span className="rating">★ {recipe.rating}</span></p>
            </div>
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                <i className="fas fa-edit"></i> Edit
              </button>
              <button className="btn btn-danger" onClick={handleDeleteClick}>
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeModal;










