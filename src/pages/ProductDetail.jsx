import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import NutritionInfo from '../components/NutritionInfo';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showNutrition, setShowNutrition] = useState(false);

  useEffect(() => {
    // Mock product data - in real app, fetch from API
    const mockProduct = {
      id: parseInt(id),
      name: 'Fresh Apple',
      price: 180,
      image: '/placeholder.svg',
      description: 'Fresh, juicy apples perfect for snacking or cooking. Rich in vitamins and fiber.',
      category: 'Fruits',
      inStock: true,
      rating: 4.5,
      reviews: 128
    };
    setProduct(mockProduct);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      alert('Added to cart successfully!');
    }
  };

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Button variant="outline-primary" onClick={() => navigate(-1)} className="mb-4">
        ← Back
      </Button>
      
      <Row>
        <Col md={6}>
          <img 
            src={product.image} 
            alt={product.name}
            className="img-fluid rounded shadow"
            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
          />
        </Col>
        
        <Col md={6}>
          <h1 className="mb-3">{product.name}</h1>
          <Badge bg="secondary" className="mb-3">{product.category}</Badge>
          
          <h3 className="text-success mb-3">{product.price}</h3>
          
          <p className="text-muted mb-4">{product.description}</p>
          
          <div className="mb-3">
            <span className="text-warning">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </span>
            <span className="ms-2">({product.reviews} reviews)</span>
          </div>

          <div className="mb-3">
            <Button 
              variant="outline-info" 
              size="sm"
              onClick={() => setShowNutrition(true)}
            >
              🥗 Nutrition Info
            </Button>
          </div>
          
          <div className="mb-4">
            <label className="form-label">Quantity:</label>
            <div className="d-flex align-items-center">
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="mx-3 fw-bold">{quantity}</span>
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>
          
          <Button 
            variant="success" 
            size="lg"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-100"
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </Col>
      </Row>

      <NutritionInfo 
        product={product}
        show={showNutrition}
        onHide={() => setShowNutrition(false)}
      />
    </Container>
  );
};

export default ProductDetail;
