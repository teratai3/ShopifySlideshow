import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import MainImgsCreatePage from './pages/MainImgs/MainImgsCreatePage';
import MainImgsShowPage from './pages/MainImgs/MainImgsShowPage';
import MainImgsDeletePage from './pages/MainImgs/MainImgsDeletePage';
import SettingsIndexPage from './pages/Settings/SettingsIndexPage';

import Layout from './Layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/main_imgs/show/:id" element={<MainImgsShowPage />} />
          <Route path="/main_imgs/create" element={<MainImgsCreatePage />} />
          <Route path="/main_imgs/delete/:id" element={<MainImgsDeletePage />} />
          <Route path="/settings" element={<SettingsIndexPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;