import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import AboutMe from './pages/AboutMe.jsx';
import Projects from './pages/Projects.jsx';
import Contact from './pages/Contact.jsx';
import Layout from './components/Layout.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta principal con layout */}
        <Route path="/" element={<Layout />}>
          {/* Subrutas que heredan el layout */}
          <Route index element={<Home />} /> {/* Ruta Home */}
          <Route path="about-me" element={<AboutMe />} />
          <Route path="projects" element={<Projects />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
