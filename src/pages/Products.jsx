
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();

  useEffect(() => {
    // Mock products data
    const mockProducts = [
      {
        id: 1,
        name: "Margherita Pizza",
        price: 469,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "pizza",
        rating: 4.8,
        description: "Classic pizza with tomato sauce, mozzarella, and fresh basil"
      },
      {
        id: 2,
        name: "Pepperoni Pizza",
        price: 349,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=200&fit=crop",
        category: "pizza",
        rating: 4.7,
        description: "Delicious pizza topped with pepperoni and cheese"
      },
      {
        id: 3,
        name: "Classic Burger",
        price: 89,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
        category: "burgers",
        rating: 4.6,
        description: "Juicy beef patty with lettuce, tomato, and special sauce"
      },
      {
        id: 4,
        name: "Cheeseburger",
        price: 99,
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop",
        category: "burgers",
        rating: 4.5,
        description: "Classic burger with melted cheese and fresh vegetables"
      },
      {
        id: 5,
        name: "Fresh Fruit Bowl",
        price: 139,
        image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=300&h=200&fit=crop",
        category: "fruits",
        rating: 4.9,
        description: "Mixed fresh fruits perfect for a healthy snack"
      },
      {
        id: 6,
        name: "Tropical Smoothie",
        price: 5.99,
        image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=300&h=200&fit=crop",
        category: "fruits",
        rating: 4.8,
        description: "Refreshing blend of tropical fruits"
      },
      {
        id: 7,
        name: "Chocolate Cake",
        price: 125,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop",
        category: "desserts",
        rating: 4.9,
        description: "Rich and moist chocolate cake"
      },
      {
        id: 8,
        name: "Cheesecake",
        price: 79,
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300&h=200&fit=crop",
        category: "desserts",
        rating: 4.8,
        description: "Creamy cheesecake with berry topping"
      }
    ];

    setProducts(mockProducts);
    setFilteredProducts(mockProducts);

    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm, sortBy]);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'pizza', label: '🍕 Pizza' },
    { value: 'burgers', label: '🍔 Burgers' },
    { value: 'fruits', label: '🍎 Fruits' },
    { value: 'desserts', label: '🍰 Desserts' }
  ];

  return (
    <div style={{marginTop: '76px', paddingTop: '40px'}}>
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="fw-bold mb-4">Our Products</h1>
          </Col>
        </Row>

        {/* Filters */}
        <Row className="mb-4">
          <Col md={4}>
            <InputGroup>
              <InputGroup.Text>🔍</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={4}>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Products Grid */}
        <Row>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Col md={6} lg={4} xl={3} key={product.id} className="mb-4">
                <Card className="food-card border-0 h-100">
                  <div style={{height: '200px', overflow: 'hidden'}}>
                    <Card.Img 
                      variant="top" 
                      src={product.image}
                      style={{height: '100%', objectFit: 'cover', cursor: 'pointer'}}
                      onClick={() => window.location.href = `/product/${product.id}`}
                    />
                  </div>
                  <Card.Body className="p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="fw-bold mb-0">
                        <Link 
                          to={`/product/Rs{product.id}`} 
                          className="text-decoration-none text-dark"
                        >
                          {product.name}
                        </Link>
                      </h6>
                      <span className="text-warning small">⭐ {product.rating}</span>
                    </div>
                    <p className="text-muted small mb-3">{product.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="fw-bold text-success mb-0">${product.price}</h5>
                      <Button 
                        size="sm"
                        className="btn-primary-custom"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center py-5">
              <h3 className="text-muted">No products found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Products;
