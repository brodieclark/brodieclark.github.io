import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const App: React.FunctionComponent = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/brld/" replace />} />
      <Route path="*" element={<Navigate to="/brld/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
