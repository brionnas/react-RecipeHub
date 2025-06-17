import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Slideshow from '../components/Slideshow';
import '../css/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [responseMessage, setResponseMessage] = useState('');


  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setResponseMessage('Sending...');

    const formPayload = new FormData();
formPayload.append('access_key', 'be2b2acf-4b64-4ed1-831f-c78b88df116d'); 
formPayload.append('name', formData.name);
formPayload.append('email', formData.email);
formPayload.append('message', formData.message);

const response = await fetch('https://api.web3forms.com/submit', {
  method: 'POST',
  body: formPayload
});


    if (response.ok) {
      setResponseMessage('✅ Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } else {
      throw new Error();
    }
  } catch (error) {
    setResponseMessage('❌ Failed to send message. Please try again.');
  }

  setTimeout(() => setResponseMessage(''), 3000);
};




  return (
    <>
      <Header />
      <main>
        <section className="page-header">
          <div className="container">
            <h1>Contact Us</h1>
            <p>We'd love to hear from you! Ask us anything about your favorite recipes or suggest new features.</p>
          </div>
        </section>

        <div className="container two-col">
          {/* Contact Form */}
          <form id="contactForm" className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                id="name" 
                type="text" 
                required 
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                id="email" 
                type="email" 
                required 
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                required 
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <button type="submit" className="btn">
              <i className="fas fa-paper-plane"></i> Send Message
            </button>
            {responseMessage && (
              <p id="responseMessage" style={{ marginTop: '1rem', color: responseMessage.includes('✅') ? 'green' : 'red' }}>
                {responseMessage}
              </p>
            )}
          </form>

          {/* Video & Slideshow */}
          <aside>
            <iframe
              width="100%"
              height="200"
              src="https://www.youtube.com/embed/1IszT_guI08"
              title="How to Make Pasta"
              frameBorder="0"
              allowFullScreen
            ></iframe>

            <div style={{ marginTop: '2rem' }}>
              <h3>🍽️ Recipe Slideshow</h3>
              <Slideshow />
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;