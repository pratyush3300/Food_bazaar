
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process order
    alert('Order placed successfully!');
    clearCart();
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h3>Your cart is empty</h3>
        <Button variant="primary" onClick={() => navigate('/products')}>
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Checkout</h2>
      
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5>Shipping Information</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <h5 className="mt-4 mb-3">Payment Method</h5>
                <Form.Check
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="card"
                  label="Credit/Debit Card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleInputChange}
                  className="mb-2"
                />
                <Form.Check
                  type="radio"
                  id="upi"
                  name="paymentMethod"
                  value="upi"
                  label="UPI Payment"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={handleInputChange}
                  className="mb-2"
                />
                <Form.Check
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  value="cod"
                  label="Cash on Delivery"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleInputChange}
                  className="mb-4"
                />
                
                <Button type="submit" variant="success" size="lg" className="w-100">
                  Place Order - ${getTotalPrice().toFixed(2)}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card>
            <Card.Header>
              <h5>Order Summary</h5>
            </Card.Header>
            <Card.Body>
              {items.map(item => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
