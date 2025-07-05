
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { OnboardingProvider } from './context/OnboardingContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OnboardingPopup from './components/OnboardingPopup';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <OnboardingProvider>
            <Router>
              <div className="App">
                <Navbar />
                <OnboardingPopup />
                <main>
                  <Routes>
                    <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                    <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
                    <Route path="/product/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
                    <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
                    <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
                    <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
                    <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
                    <Route 
                      path="/dashboard" 
                      element={
                        <ProtectedRoute>
                          <PageTransition><Dashboard /></PageTransition>
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin" 
                      element={
                        <ProtectedRoute adminOnly={true}>
                          <PageTransition><AdminDashboard /></PageTransition>
                        </ProtectedRoute>
                      } 
                    />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </OnboardingProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
