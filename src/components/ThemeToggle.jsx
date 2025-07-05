
import React from 'react';
import { Button } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline-secondary"
      onClick={toggleTheme}
      className="p-2 rounded-circle"
      style={{ width: '40px', height: '40px' }}
    >
      {isDark ? '☀️' : '🌙'}
    </Button>
  );
};

export default ThemeToggle;
