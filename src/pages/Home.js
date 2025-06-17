import React from 'react';
import Hero from '../components/Hero';
import FeaturedRecipe from '../components/FeaturedRecipe';
import LatestRecipes from '../components/LatestRecipes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Home.css';

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="container">
          <FeaturedRecipe />
          <LatestRecipes />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
