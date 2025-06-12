import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Contact.css';

const Contact = () => {
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = '/toggleMenu.js';
    script1.defer = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = '/form.js';
    script2.defer = true;
    document.body.appendChild(script2);

    const script3 = document.createElement('script');
    script3.src = '/slideshow.js';
    script3.defer = true;
    document.body.appendChild(script3);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
      document.body.removeChild(script3);
    };
  }, []);

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
          <form id="contactForm" className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" required placeholder="Your Name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" required placeholder="Your Email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" required placeholder="Your Message"></textarea>
            </div>
            <button type="submit" className="btn">
              <i className="fas fa-paper-plane"></i> Send Message
            </button>
            <p id="responseMessage" style={{ marginTop: '1rem' }}></p>
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
              <img
                id="slideshow"
                src="/images/margherita.jpg"
                alt="Slideshow"
                style={{ width: '100%', borderRadius: '12px', height: '200px', objectFit: 'cover' }}
              />
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;