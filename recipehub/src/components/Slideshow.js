import './Slideshow.css';
import { useEffect, useState } from 'react';

const Slideshow = () => {
  const images = [
    'images/margherita.jpg',
    'images/shrimp-tacos.jpg',
    'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&h=200&fit=crop',
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <img
      src={images[index]}
      alt="Slideshow"
      style={{ width: '100%', borderRadius: '12px', height: '200px', objectFit: 'cover' }}
    />
  );
};

export default Slideshow;
