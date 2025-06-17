import React, { useState } from 'react';
import Header from '../components/Header'; // Site-wide nav bar
import PageHeader from '../components/PageHeader'; // Page-specific header
import StatsGrid from '../components/StatsGrid';
import Footer from '../components/Footer';
import '../css/Admin.css';

const Admin = () => {
  const [pendingRecipes, setPendingRecipes] = useState([
    {
      id: 1,
      title: "Grandma's Apple Pie",
      submittedBy: "Sarah Johnson",
      submittedAt: "2 hours ago",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=200&fit=crop",
      status: "pending"
    },
    {
      id: 2,
      title: "Spicy Thai Curry",
      submittedBy: "Mike Chen",
      submittedAt: "5 hours ago",
      image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=200&fit=crop",
      status: "pending"
    },
    {
      id: 3,
      title: "Chocolate Brownies",
      submittedBy: "Emma Davis",
      submittedAt: "1 day ago",
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=200&fit=crop",
      status: "pending"
    }
  ]);

  const [adminStats] = useState([
    {
      icon: 'fas fa-users',
      title: 'Active Users',
      value: 1247,
      color: 'var(--primary)'
    },
    {
      icon: 'fas fa-utensils',
      title: 'Total Recipes',
      value: 3892,
      color: 'var(--accent)'
    },
    {
      icon: 'fas fa-heart',
      title: 'Recipe Saves',
      value: 12504,
      color: 'var(--success)'
    }
  ]);

  const handleRecipeAction = (recipeId, action) => {
    setPendingRecipes(prevRecipes =>
      prevRecipes.map(recipe =>
        recipe.id === recipeId
          ? { ...recipe, status: action }
          : recipe
      )
    );

    console.log(`Recipe ${recipeId} ${action}`);
  };

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <>
      <Header /> {/* Global site navigation */}
      <div className="admin-dashboard">
        <PageHeader
          title="Admin Dashboard"
          subtitle="Manage recipe submissions and monitor community activity"
        />

        <div className="container">
          {/* Pending Recipes Section */}
          <section className="pending-recipes-section">
            <h2 className="section-title">Pending Recipe Submissions</h2>
            <div className="recipes-grid">
              {pendingRecipes.filter(recipe => recipe.status === 'pending').map(recipe => (
                <div key={recipe.id} className="recipe-card">
                  <img src={recipe.image} alt={recipe.title} />
                  <div className="card-content">
                    <h3>{recipe.title}</h3>
                    <p>Submitted by: {recipe.submittedBy}</p>
                    <div className="card-meta">
                      <span>
                        <i className="fas fa-clock"></i> {recipe.submittedAt}
                      </span>
                      <span className="status-badge">
                        <i className="fas fa-eye"></i> Pending Review
                      </span>
                    </div>
                    <div className="card-actions">
                      <button
                        className="action-btn approve-btn"
                        onClick={() => handleRecipeAction(recipe.id, 'approved')}
                      >
                        <i className="fas fa-check"></i> Approve
                      </button>
                      <button
                        className="action-btn edit-btn"
                        onClick={() => handleRecipeAction(recipe.id, 'editing')}
                      >
                        <i className="fas fa-edit"></i> Edit
                      </button>
                      <button
                        className="action-btn reject-btn"
                        onClick={() => handleRecipeAction(recipe.id, 'rejected')}
                      >
                        <i className="fas fa-times"></i> Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Community Stats Section */}
          <section className="community-stats-section">
            <h2 className="section-title">Community Activity</h2>
            <StatsGrid stats={adminStats} />
          </section>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Admin;

