
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div style={{marginTop: '76px', paddingTop: '40px', minHeight: '80vh'}}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold" style={{color: 'var(--primary-orange)'}}>
                    🍕 MapFood
                  </h2>
                  <h4 className="fw-bold mb-2">Welcome Back!</h4>
                  <p className="text-muted">Sign in to your account</p>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="rounded-pill"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="rounded-pill"
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="btn-primary-custom w-100 mb-3"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </Form>

                <div className="text-center">
                  <p className="mb-2">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-decoration-none fw-bold">
                      Sign up here
                    </Link>
                  </p>
                  <small className="text-muted">
                    Use admin@mapfood.com / password for admin access
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
