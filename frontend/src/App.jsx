import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import OrderConfirmation from './pages/OrderConfirmation';
import PageTransition from './components/PageTransition';

const App = () => {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
            <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
            <Route path="/order-confirmation" element={<PageTransition><OrderConfirmation /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </Container>
      <Footer />
    </Box>
  );
};

export default App;