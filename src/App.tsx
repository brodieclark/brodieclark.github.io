import React, { useEffect } from 'react';
import i18n from 'i18next';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
// import LayoutComponent from './components/Layout';
import RSVP from './pages/RSVP';
import Home from './pages/Home';

export interface IAppProps { }

const App: React.FunctionComponent<IAppProps> = (props) => {

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="rsvp" element={<RSVP />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
