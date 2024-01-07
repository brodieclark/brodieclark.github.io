import React from 'react';
import i18n from 'i18next';

const LanguageSwitcher: React.FC = () => {
  const currentLanguage = i18n.language;

  // Style for active language
  const activeStyle = {
    fontWeight: 'bold',
    cursor: 'pointer',
    marginLeft: '5px',
    marginRight: '5px',
  };

  // Style for inactive language
  const inactiveStyle = {
    cursor: 'pointer',
    marginLeft: '5px',
    marginRight: '5px',
  };

  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
      <span
        style={currentLanguage === 'en' ? activeStyle : inactiveStyle}
        onClick={() => {
          i18n.changeLanguage('en');
          console.log("Language changed to:", i18n.language);
        }}
      >
        EN
      </span>
      {' | '}
      <span
        style={currentLanguage === 'fi' ? activeStyle : inactiveStyle}
        onClick={() => {
          i18n.changeLanguage('fi');
          console.log("Language changed to:", i18n.language);
        }}
      >
        FI
      </span>
    </div>
  );
};

export default LanguageSwitcher;
