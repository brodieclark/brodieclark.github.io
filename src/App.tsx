import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import LayoutComponent from './components/Layout';
import RSVP from './pages/RSVP';
import Home from './pages/Home';

export interface IAppProps { }

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="rsvp" element={<RSVP />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
