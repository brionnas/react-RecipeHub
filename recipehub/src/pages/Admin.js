// Continuing with the next page: Admin.js

import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/Admin.css";

const Admin = () => {
  return (
    <>
      <Header />
      <main>
        <section className="page-header">
          <div className="container">
            <h1>Admin Dashboard</h1>
            <p>Manage user submissions, moderate recipes, and configure site settings</p>
          </div>
        </section>

        <div className="container">
          <section className="admin-actions">
            <h2 className="section-title">Site Management</h2>
            <p className="section-subtitle">Administrative tools to keep RecipeHub running smoothly</p>

            <div className="grid-3">
              <div className="card">
                <div className="card-content">
                  <h3>Moderate Recipes</h3>
                  <p>Review and approve or reject new recipe submissions from users</p>
                  <a href="#" className="btn full-width">Review Recipes</a>
                </div>
              </div>

              <div className="card">
                <div className="card-content">
                  <h3>User Reports</h3>
                  <p>Handle flagged recipes and reported issues submitted by the community</p>
                  <a href="#" className="btn full-width">View Reports</a>
                </div>
              </div>

              <div className="card">
                <div className="card-content">
                  <h3>Settings</h3>
                  <p>Adjust website preferences, update categories, and manage access control</p>
                  <a href="#" className="btn full-width">Manage Settings</a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Admin;
