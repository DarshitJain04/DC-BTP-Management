import React from 'react';
import styles from './HeroSection.module.css';
import FadeInWhenVisible from '../Animation/FadeIn';
import FadeUpWhenVisible from '../Animation/FadeUp';

function HeroSection() {
  return (
    <>
      <div className={styles.hero_container}>
        <h1>
          <FadeUpWhenVisible>DC & BTP Management Portal</FadeUpWhenVisible>
        </h1>
        <div
          style={{
            borderTop: '2px solid rgb(255 255 255)',
            marginLeft: '2px',
            marginRight: '2px',
            width: '50%',
          }}
        >
          <FadeInWhenVisible />
        </div>

        <p>
          <FadeUpWhenVisible>
            Indian Institute of Technology Jodhpur
          </FadeUpWhenVisible>
        </p>
      </div>
    </>
  );
}

export default HeroSection;
