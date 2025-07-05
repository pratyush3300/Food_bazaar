
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5 className="fw-bold mb-3" style={{color: 'var(--secondary-yellow)'}}>
              🍕 MapFood
            </h5>
            <p>
              Your favorite food delivery platform. Fresh, fast, and delicious meals 
              delivered right to your doorstep.
            </p>
          </Col>
          
          <Col md={2} className="mb-4">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/products" className="text-light text-decoration-none">Products</a></li>
              <li><a href="/cart" className="text-light text-decoration-none">Cart</a></li>
            </ul>
          </Col>
          
          <Col md={3} className="mb-4">
            <h6 className="fw-bold mb-3">Categories</h6>
            <ul className="list-unstyled">
              <li>🍕 Pizza</li>
              <li>🍔 Burgers</li>
              <li>🍎 Fresh Fruits</li>
              <li>🥗 Healthy Food</li>
            </ul>
          </Col>
          
          <Col md={3} className="mb-4">
            <h6 className="fw-bold mb-3">Contact Info</h6>
            <p>📧 info@mapfood.com</p>
            <p>📱 +91 9262293389</p>
            <p>📍 New Beily Road, Taste City</p>
          </Col>
        </Row>
        
        <hr className="my-4" />
        
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              © 2024 MapFood. All rights reserved. | Made with ❤️ for food lovers
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
