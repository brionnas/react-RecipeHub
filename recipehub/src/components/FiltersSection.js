import React, { useState } from 'react';
import './FiltersSection.css';

const FiltersSection = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    category: 'All Categories',
    dietary: 'All Dietary Types',
    sort: 'Sort by Newest'
  });

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  return (
    <section className="filters-section">
      <div className="filters">
        <select 
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option>All Categories</option>
          <option>Appetizers</option>
          <option>Main Dishes</option>
          <option>Desserts</option>
          <option>Soups & Salads</option>
          <option>Beverages</option>
        </select>
        
        <select 
          value={filters.dietary}
          onChange={(e) => handleFilterChange('dietary', e.target.value)}
        >
          <option>All Dietary Types</option>
          <option>Vegetarian</option>
          <option>Vegan</option>
          <option>Gluten-Free</option>
          <option>Keto</option>
          <option>Low-Carb</option>
        </select>
        
        <select 
          value={filters.sort}
          onChange={(e) => handleFilterChange('sort', e.target.value)}
        >
          <option>Sort by Newest</option>
          <option>Most Popular</option>
          <option>Highest Rated</option>
          <option>Quick & Easy</option>
        </select>
      </div>
    </section>
  );
};

export default FiltersSection;