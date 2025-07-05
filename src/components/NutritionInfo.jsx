
import React from 'react';
import { Badge, Modal, Table } from 'react-bootstrap';

const NutritionInfo = ({ product, show, onHide }) => {
  const nutritionData = {
    calories: Math.floor(Math.random() * 400) + 100,
    protein: Math.floor(Math.random() * 20) + 5,
    carbs: Math.floor(Math.random() * 50) + 10,
    fat: Math.floor(Math.random() * 15) + 2,
    fiber: Math.floor(Math.random() * 8) + 1,
    sugar: Math.floor(Math.random() * 15) + 2
  };

  const badges = [];
  if (nutritionData.calories < 200) badges.push({ text: 'Low Calorie', color: 'success' });
  if (nutritionData.protein > 15) badges.push({ text: 'High Protein', color: 'primary' });
  if (nutritionData.fiber > 5) badges.push({ text: 'High Fiber', color: 'info' });
  if (product?.category === 'Fruits') badges.push({ text: 'Organic', color: 'warning' });

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Nutrition Information - {product?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          {badges.map((badge, index) => (
            <Badge key={index} bg={badge.color} className="me-2 mb-2">
              {badge.text}
            </Badge>
          ))}
        </div>
        
        <Table striped bordered>
          <tbody>
            <tr>
              <td><strong>Calories</strong></td>
              <td>{nutritionData.calories} kcal</td>
            </tr>
            <tr>
              <td><strong>Protein</strong></td>
              <td>{nutritionData.protein}g</td>
            </tr>
            <tr>
              <td><strong>Carbohydrates</strong></td>
              <td>{nutritionData.carbs}g</td>
            </tr>
            <tr>
              <td><strong>Fat</strong></td>
              <td>{nutritionData.fat}g</td>
            </tr>
            <tr>
              <td><strong>Fiber</strong></td>
              <td>{nutritionData.fiber}g</td>
            </tr>
            <tr>
              <td><strong>Sugar</strong></td>
              <td>{nutritionData.sugar}g</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default NutritionInfo;
