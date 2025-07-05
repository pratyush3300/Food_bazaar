
import React from 'react';
import { Container, Row, Col, Card, Button, Table, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div style={{marginTop: '76px', paddingTop: '40px', minHeight: '60vh'}}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={6}>
              <div className="py-5">
                <h2 className="mb-4">Your Cart is Empty</h2>
                <p className="text-muted mb-4">Looks like you haven't added any items to your cart yet.</p>
                <Button as={Link} to="/products" className="btn-primary-custom">
                  Start Shopping
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div style={{marginTop: '76px', paddingTop: '40px'}}>
      <Container>
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="fw-bold">Shopping Cart</h1>
              <Button variant="outline-danger" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-0">
                <Table responsive className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              style={{width: '60px', height: '60px', objectFit: 'cover'}}
                              className="rounded me-3"
                            />
                            <div>
                              <h6 className="mb-1">{item.name}</h6>
                              <small className="text-muted">{item.category}</small>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">
                          <strong>${item.price}</strong>
                        </td>
                        <td className="align-middle">
                          <div className="d-flex align-items-center">
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </Button>
                            <span className="mx-3 fw-bold">{item.quantity}</span>
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </td>
                        <td className="align-middle">
                          <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                        </td>
                        <td className="align-middle">
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-light">
                <h5 className="mb-0">Order Summary</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal:</span>
                  <strong>${getTotalPrice().toFixed(2)}</strong>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Delivery Fee:</span>
                  <strong>$2.99</strong>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Tax:</span>
                  <strong>${(getTotalPrice() * 0.08).toFixed(2)}</strong>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <strong>Total:</strong>
                  <strong className="text-success">
                    ${(getTotalPrice() + 2.99 + (getTotalPrice() * 0.08)).toFixed(2)}
                  </strong>
                </div>
                
                <Button 
                  as={Link} 
                  to="/checkout" 
                  className="btn-primary-custom w-100 mb-3"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
                
                <Button 
                  as={Link} 
                  to="/products" 
                  variant="outline-primary" 
                  className="w-100"
                >
                  Continue Shopping
                </Button>
              </Card.Body>
            </Card>

            <Alert variant="info" className="mt-3">
              <strong>🚚 Free delivery</strong> on orders over $25!
            </Alert>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cart;
