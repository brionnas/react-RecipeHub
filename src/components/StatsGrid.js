import React from 'react';
import './StatsGrid.css';

const StatsGrid = () => {
  const stats = [
    {
      icon: 'fas fa-book-open',
      title: 'Saved Recipes',
      value: 24,
      color: 'var(--primary)'
    },
    {
      icon: 'fas fa-calendar-alt',
      title: 'Meals Planned',
      value: 12,
      color: 'var(--accent)'
    },
    {
      icon: 'fas fa-shopping-cart',
      title: 'Shopping Items',
      value: 8,
      color: 'var(--success)'
    },
    {
      icon: 'fas fa-star',
      title: 'Avg Rating',
      value: 4.7,
      color: '#FFD700'
    }
  ];

  return (
    <section className="stats-section">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <i className={stat.icon} style={{ color: stat.color }}></i>
            <h4>{stat.title}</h4>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsGrid;
