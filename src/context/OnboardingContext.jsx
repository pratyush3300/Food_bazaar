
import React, { createContext, useContext, useState, useEffect } from 'react';

const OnboardingContext = createContext();

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

export const OnboardingProvider = ({ children }) => {
  const [isFirstVisit, setIsFirstVisit] = useState(() => {
    return !localStorage.getItem('hasVisited');
  });
  
  const [currentStep, setCurrentStep] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (isFirstVisit) {
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isFirstVisit]);

  const completeOnboarding = () => {
    localStorage.setItem('hasVisited', 'true');
    setIsFirstVisit(false);
    setShowOnboarding(false);
    setCurrentStep(0);
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  return (
    <OnboardingContext.Provider value={{
      isFirstVisit,
      showOnboarding,
      currentStep,
      nextStep,
      prevStep,
      completeOnboarding,
      setShowOnboarding
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};
