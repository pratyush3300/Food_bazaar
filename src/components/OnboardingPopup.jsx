
import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { useOnboarding } from '../context/OnboardingContext';

const OnboardingPopup = () => {
  const { showOnboarding, currentStep, nextStep, prevStep, completeOnboarding } = useOnboarding();

  const steps = [
    {
      title: "Welcome to MapFood! 🍕",
      content: "Your favorite food delivery app! Let's show you around.",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop"
    },
    {
      title: "Browse Categories 🛍️",
      content: "Explore different food categories like Pizza, Burgers, Fruits, and Desserts.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop"
    },
    {
      title: "Add to Cart 🛒",
      content: "Found something delicious? Add it to your cart and checkout easily!",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop"
    },
    {
      title: "Fast Delivery 🚚",
      content: "Get your food delivered in 30 minutes or less. Enjoy your meal!",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop"
    }
  ];

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  if (!showOnboarding) return null;

  return (
    <Modal show={showOnboarding} onHide={completeOnboarding} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{currentStepData.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <Row>
          <Col md={6}>
            <img 
              src={currentStepData.image} 
              alt={currentStepData.title}
              className="img-fluid rounded mb-3"
            />
          </Col>
          <Col md={6} className="d-flex align-items-center">
            <div>
              <p className="lead">{currentStepData.content}</p>
              <div className="mt-3">
                <small className="text-muted">
                  Step {currentStep + 1} of {steps.length}
                </small>
              </div>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <Button 
          variant="outline-secondary" 
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <div className="d-flex gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`rounded-circle ${index === currentStep ? 'bg-primary' : 'bg-light'}`}
              style={{ width: '10px', height: '10px' }}
            />
          ))}
        </div>
        {isLastStep ? (
          <Button variant="success" onClick={completeOnboarding}>
            Get Started!
          </Button>
        ) : (
          <Button variant="primary" onClick={nextStep}>
            Next
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default OnboardingPopup;
