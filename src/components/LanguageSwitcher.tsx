import React, { useState, useEffect } from 'react';
import i18n from 'i18next';
import styles from '../styles/LanguageSwitcher.module.css';
import mapStyles from '../styles/mapStyles';

const LanguageSwitcher: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  // Style for active language
  const activeStyle = {
    padding: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginLeft: '0px',
    marginRight: '0px',
  };

  // Style for inactive language
  const inactiveStyle = {
    padding: '10px',
    cursor: 'pointer',
    marginLeft: '0px',
    marginRight: '0px',
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language).then(() => {
      setCurrentLanguage(language);
    });
    localStorage.setItem('language', language);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      changeLanguage(savedLanguage); // Use changeLanguage to ensure consistency
    }
  }, []);

  return (
    <div className={styles.languageSwitcherContainer}>
      <span
        style={currentLanguage === 'en' ? activeStyle : inactiveStyle}
        onClick={() => changeLanguage('en')}
      >
        EN
      </span>
      {' | '}
      <span
        style={currentLanguage === 'fi' ? activeStyle : inactiveStyle}
        onClick={() => changeLanguage('fi')}
      >
        FI
      </span>
    </div>
  );
};

export default LanguageSwitcher;
