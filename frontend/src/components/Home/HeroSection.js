import React from 'react';
import styles from './HeroSection.module.css';
import iitjKogo from '../../assets/iitjKogo.png';
import cclogo from '../../assets/cclogo.png';
import FadeInWhenVisible from '../Animation/FadeIn';
import FadeUpWhenVisible from '../Animation/FadeUp';
import Navbar from '../Navbar/Navbar';

function HeroSection() {
  return (
    <>
      <Navbar />
      <div className={styles.hero_container}>
        <div className={styles.logo}>
          <FadeInWhenVisible>
            <img className={styles.iitj_logo} src={iitjKogo} alt="logo" />
            <img className={styles.cdc_logo} src={cclogo} alt="logo" />
          </FadeInWhenVisible>
        </div>
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
          {' '}
          <FadeInWhenVisible></FadeInWhenVisible>
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
