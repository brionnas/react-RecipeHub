import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Submit.css';

const Submit = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    img_name: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting...');

    try {
      if (!formData.title || !formData.description || !formData.img_name) {
        setMessage('❌ Please fill in all fields.');
        return;
      }

      const newRecipe = {
        title: formData.title,
        description: formData.description,
        prep_time: Math.floor(Math.random() * 30) + 10,
        rating: 0,
        img_name: formData.img_name
      };

      const response = await fetch('https://recipehub-serverside.onrender.com/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe)
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('✅ Recipe submitted successfully!');
        setFormData({ title: '', description: '', img_name: '' });

        setTimeout(() => {
          navigate('/browse?refresh=true');
        }, 1000);
      } else {
        setMessage(`❌ ${result.error || 'Submission failed.'}`);
      }
    } catch (error) {
      setMessage('❌ Network error. Please try again.');
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
              <label htmlFor="title">Recipe Title</label>
              <input type="text" id="title" value={formData.title} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea id="description" rows="4" value={formData.description} onChange={handleChange} required></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="img_name">Image Filename (e.g. pasta.jpg)</label>
              <input type="text" id="img_name" value={formData.img_name} onChange={handleChange} required />
            </div>

            <button type="submit" className="btn">Submit Recipe</button>

            {message && <p style={{ marginTop: '1rem', color: message.includes('✅') ? 'green' : 'red' }}>{message}</p>}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Submit;



