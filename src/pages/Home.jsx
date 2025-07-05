
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Home = () => {
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Mock featured products
    setFeaturedProducts([
      {
        id: 1,
        name: "Margherita Pizza",
        price: 12.59,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Pizza",
        rating: 4.8
      },
      {
        id: 2,
        name: "Classic Burger",
        price: 8.59,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
        category: "Burgers",
        rating: 4.6
      },
      {
        id: 3,
        name: "Fresh Fruit Bowl",
        price: 11.6,
        image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=300&h=200&fit=crop",
        category: "Fruits",
        rating: 4.9
      }
    ]);
  }, []);

  const categories = [
    {
      name: "Pizza",
      emoji: "🍕",
      color: "var(--primary-red)",
      description: "Hot & Delicious"
    },
    {
      name: "Burgers", 
      emoji: "🍔",
      color: "var(--primary-orange)",
      description: "Juicy & Fresh"
    },
    {
      name: "Fruits",
      emoji: "🍎", 
      color: "var(--light-green)",
      description: "Fresh & Healthy"
    },
    {
      name: "Desserts",
      emoji: "🍰",
      color: "var(--secondary-yellow)",
      description: "Sweet & Tasty"
    }
  ];

  return (
    <div style={{marginTop: '76px'}}>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="animate-slideInLeft">
              <h1 className="display-4 fw-bold text-white mb-4">
                Delicious Food <br />
                <span style={{color: 'var(--secondary-yellow)'}}>Delivered Fast</span>
              </h1>
              <p className="lead text-white mb-4">
                Fresh ingredients, amazing flavors, and quick delivery. 
                Order your favorite meals from MapFood today!
              </p>
              <Button 
                as={Link} 
                to="/products" 
                className="btn-primary-custom me-3 animate-bounce-custom"
                size="lg"
              >
                Order Now 🍽️
              </Button>
              <Button 
                variant="outline-light" 
                size="lg"
                className="rounded-pill"
              >
                View Menu
              </Button>
            </Col>
            <Col lg={6} className="text-center animate-fadeInUp">
              <div className="animate-pulse-custom">
                <img 
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=400&fit=crop"
                  alt="Delicious Food"
                  className="img-fluid rounded-circle shadow-lg"
                  style={{maxWidth: '400px', border: '5px solid white'}}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold mb-3">Browse by Category</h2>
              <p className="lead text-muted">Discover amazing food from different categories</p>
            </Col>
          </Row>
          
          <Row>
            {categories.map((category, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card 
                  className="category-card border-0 text-center h-100"
                  style={{backgroundColor: category.color + '20'}}
                >
                  <Card.Body className="p-4">
                    <div 
                      className="feature-icon mx-auto mb-3"
                      style={{backgroundColor: category.color}}
                    >
                      <span style={{fontSize: '2rem'}}>{category.emoji}</span>
                    </div>
                    <h5 className="fw-bold mb-2">{category.name}</h5>
                    <p className="text-muted mb-3">{category.description}</p>
                    <Button 
                      as={Link}
                      to={`/products?category=${category.name.toLowerCase()}`}
                      variant="outline-dark"
                      className="rounded-pill"
                    >
                      Explore
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold mb-3">Featured Products</h2>
              <p className="lead text-muted">Try our most popular dishes</p>
            </Col>
          </Row>
          
          <Row>
            {featuredProducts.map((product) => (
              <Col md={6} lg={4} key={product.id} className="mb-4">
                <Card className="food-card border-0 h-100">
                  <div style={{height: '200px', overflow: 'hidden'}}>
                    <Card.Img 
                      variant="top" 
                      src={product.image}
                      style={{height: '100%', objectFit: 'cover'}}
                    />
                  </div>
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="fw-bold mb-0">{product.name}</h5>
                      <span className="text-warning">⭐ {product.rating}</span>
                    </div>
                    <p className="text-muted mb-3">{product.category}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="fw-bold text-success mb-0">${product.price}</h4>
                      <Button 
                        className="btn-primary-custom"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          
          <Row className="text-center mt-4">
            <Col>
              <Button 
                as={Link} 
                to="/products" 
                variant="outline-primary" 
                size="lg"
                className="rounded-pill"
              >
                View All Products
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center">
            <Col md={4} className="mb-4">
              <div className="feature-icon">🚚</div>
              <h5 className="fw-bold">Fast and Furious Delivery</h5>
              <p className="text-muted">Get your food delivered in 30 minutes or less</p>
            </Col>
            <Col md={4} className="mb-4">
              <div className="feature-icon">🌟</div>
              <h5 className="fw-bold">Quality Food</h5>
              <p className="text-muted">Fresh ingredients and amazing flavors guaranteed</p>
            </Col>
            <Col md={4} className="mb-4">
              <div className="feature-icon">💳</div>
              <h5 className="fw-bold">Easy Payment</h5>
              <p className="text-muted">Multiple payment options for your convenience</p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
