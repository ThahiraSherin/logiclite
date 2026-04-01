import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Fixed typo (bootstrap-icon-font → bootstrap-icons)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage/HomePage';
import About from './components/About/About';
// import Services from './components/Services';
import Services from './components/services/Services';
import Contact from './components/Contact/Contact'; // Ensure this component exists
import Careers from './components/Career/Careers'; // Ensure this component exists
import Footer from './components/Footer';
import Blog from './components/Blog/Blog';
import ScrollToTop from './components/ScrollToTop';
import FloatingWhatsapp from './components/HomePage/FloatingWhatsapp';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="careers" element={<Careers />} />
          <Route path="blogs" element={<Blog/>}/>
          
        </Routes>
      </main>
      <Footer />

    {/* FLOATING WHATSAPP */}
      <FloatingWhatsapp />
    </Router>
  );
}

export default App;