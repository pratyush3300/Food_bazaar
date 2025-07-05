
import React, { useState } from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const NavigationBar = () => {
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setExpanded(false);
  };

  return (
    <Navbar 
      bg="light" 
      expand="lg" 
      fixed="top" 
      className="shadow-sm"
      expanded={expanded}
      onToggle={(expanded) => setExpanded(expanded)}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3" style={{color: 'var(--primary-orange)'}}>
          🍕 MapFood
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Home</Nav.Link>
            <Nav.Link as={Link} to="/products" onClick={() => setExpanded(false)}>Products</Nav.Link>
          </Nav>
          
          <Nav className="align-items-center">
            <Nav.Link as={Link} to="/cart" className="position-relative me-3" onClick={() => setExpanded(false)}>
              🛒 Cart
              {getTotalItems() > 0 && (
                <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
                  {getTotalItems()}
                </Badge>
              )}
            </Nav.Link>
            
            {user ? (
              <>
                <Nav.Link as={Link} to="/dashboard" onClick={() => setExpanded(false)}>
                  Dashboard
                </Nav.Link>
                {user.isAdmin && (
                  <Nav.Link as={Link} to="/admin" onClick={() => setExpanded(false)}>
                    Admin
                  </Nav.Link>
                )}
                <Nav.Link onClick={handleLogout} style={{cursor: 'pointer'}}>
                  Logout ({user.name})
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" onClick={() => setExpanded(false)}>Login</Nav.Link>
                <Nav.Link as={Link} to="/signup" onClick={() => setExpanded(false)}>Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
