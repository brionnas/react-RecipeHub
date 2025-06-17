// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="#">Saved Recipes</a></li>
          <li><a href="#">Shopping List</a></li>
          <li><a href="#">Preferences</a></li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3>Tips</h3>
        <p>Check back weekly for new seasonal meal suggestions and shopping strategies!</p>
      </div>
    </aside>
  );
};

export default Sidebar;
