import React, { useState } from 'react';
import './MealPlanner.css';

const MealPlanner = () => {
  const [selectedWeek, setSelectedWeek] = useState('current');
  
  // Get current date and generate week days
  const getCurrentWeekDays = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay);
    
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      
      const isToday = date.toDateString() === today.toDateString();
      
      days.push({
        id: i,
        name: dayNames[i],
        date: date.getDate(),
        isToday,
        meal: i === 3 ? 'Pizza Night' : null // Sample meal for Wednesday
      });
    }
    
    return days;
  };

  const [weekDays, setWeekDays] = useState(getCurrentWeekDays());

  const handleAddMeal = () => {
    console.log('Add meal clicked');
    // Implement add meal functionality
  };

  const handleDayClick = (day) => {
    console.log('Day clicked:', day);
    // Implement day selection functionality
  };

  return (
    <section className="meal-planner-section">
      <h2 className="section-title">Weekly Meal Planner</h2>
      
      <div className="meal-planner">
        <div className="meal-header">
          <h3>This Week</h3>
          <button className="btn btn-secondary" onClick={handleAddMeal}>
            <i className="fas fa-plus"></i> Add Meal
          </button>
        </div>
        
        <div className="week-grid">
          {weekDays.map(day => (
            <div 
              key={day.id}
              className={`day-card ${day.isToday ? 'today' : ''}`}
              onClick={() => handleDayClick(day)}
            >
              <h4>{day.name}</h4>
              <span className="day-date">{day.date}</span>
              {day.meal && <small>{day.meal}</small>}
              {!day.meal && <small className="empty-meal">No meal planned</small>}
            </div>
          ))}
        </div>
        
        <div className="meal-planner-actions">
          <button className="btn">
            <i className="fas fa-calendar-week"></i> View Full Calendar
          </button>
          <button className="btn btn-secondary">
            <i className="fas fa-download"></i> Export Plan
          </button>
        </div>
      </div>
    </section>
  );
};

export default MealPlanner;
