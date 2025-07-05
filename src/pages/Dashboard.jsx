
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const mockOrders = [
    {
      id: 1,
      date: '2024-01-15',
      total: 25.99,
      status: 'Delivered',
      items: ['Fresh Apples', 'Bananas']
    },
    {
      id: 2,
      date: '2024-01-20',
      total: 15.50,
      status: 'In Transit',
      items: ['Oranges', 'Grapes']
    }
  ];

  return (
    <Container className="py-5">
      <Row>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <div className="bg-primary rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" 
                   style={{ width: '80px', height: '80px' }}>
                <span className="text-white fs-2">{user?.name?.charAt(0)?.toUpperCase()}</span>
              </div>
              <h5>{user?.name}</h5>
              <p className="text-muted">{user?.email}</p>
              <Button variant="outline-danger" onClick={logout}>
                Logout
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={9}>
          <h2 className="mb-4">My Dashboard</h2>
          
          <Card className="mb-4">
            <Card.Header>
              <h5>Account Information</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <p><strong>Name:</strong> {user?.name}</p>
                  <p><strong>Email:</strong> {user?.email}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Member Since:</strong> January 2024</p>
                  <p><strong>Total Orders:</strong> {mockOrders.length}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Header>
              <h5>Recent Orders</h5>
            </Card.Header>
            <Card.Body>
              {mockOrders.length > 0 ? (
                mockOrders.map(order => (
                  <div key={order.id} className="border-bottom pb-3 mb-3">
                    <Row>
                      <Col md={8}>
                        <h6>Order #{order.id}</h6>
                        <p className="text-muted mb-1">Date: {order.date}</p>
                        <p className="mb-1">Items: {order.items.join(', ')}</p>
                        <span className={`badge ${order.status === 'Delivered' ? 'bg-success' : 'bg-warning'}`}>
                          {order.status}
                        </span>
                      </Col>
                      <Col md={4} className="text-end">
                        <h6>${order.total}</h6>
                        <Button variant="outline-primary" size="sm">
                          View Details
                        </Button>
                      </Col>
                    </Row>
                  </div>
                ))
              ) : (
                <p className="text-muted">No orders yet</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
