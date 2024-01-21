import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import RSVP from './pages/RSVP';
import Home from './pages/Home';
import Journey from './pages/Journey';
import Explore from './pages/Explore';

export interface IAppProps { }

const App: React.FunctionComponent<IAppProps> = (props) => {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="rsvp" element={<RSVP />} />
        <Route path="journey" element={<Journey />} />
        <Route path="explore" element={<Explore />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
