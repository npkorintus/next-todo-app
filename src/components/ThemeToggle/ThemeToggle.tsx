import React from 'react';
import Image from 'next/image';
import { useTheme } from '../../context/ThemeContext';

import classes from './ThemeToggle.module.css';

import sun from '/images/icon-sun.svg';
import moon from '/images/icon-moon.svg';

function ThemeToggle(){
  const { theme, toggleTheme } = useTheme();

  const sunIconPath = "/images/icon-sun.svg";
  const moonIconPath = "/images/icon-moon.svg";

  return (
    <button
      onClick={toggleTheme}
      className={classes.themeToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* <img src={theme === 'light' ? moon : sun} alt="Toggle theme" /> */}
      <Image src={theme === 'light' ? moonIconPath : sunIconPath} alt="Toggle theme" width={20} height={20} />
    </button>
  );
};

export default ThemeToggle;
