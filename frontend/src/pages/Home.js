import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import styles from '../styles/pages/Home.module.css';
import FadeInWhenVisible from '../components/Animation/FadeIn';

const Home = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div className={styles.homeWrapper}>
        <FadeInWhenVisible>
          <HeroSection />
        </FadeInWhenVisible>
      </div>
    </div>
  );
};

export default Home;
