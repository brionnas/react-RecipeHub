import React from 'react';
import './LoadMoreButton.css';

const LoadMoreButton = ({ onLoadMore, loading = false }) => {
  return (
    <section className="load-more">
      <button 
        className="btn btn-secondary"
        onClick={onLoadMore}
        disabled={loading}
      >
        {loading ? (
          <>
            <div className="loading"></div>
            Loading...
          </>
        ) : (
          <>
            <i className="fas fa-plus"></i>
            Load More Recipes
          </>
        )}
      </button>
    </section>
  );
};

export default LoadMoreButton;