import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import eWasteFacts from '../data/ewaste-facts.json';
import logo from '../assets/logo.png';

const Preloader = ({ onLoadingComplete }) => {
  const [currentFact, setCurrentFact] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Randomly select a fact
    const randomFact = eWasteFacts.facts[Math.floor(Math.random() * eWasteFacts.facts.length)];
    setCurrentFact(randomFact);

    // Simulate loading time (3 seconds)
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onLoadingComplete) {
        onLoadingComplete();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="text-center p-8 max-w-2xl">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mb-8"
        >
          <img src={logo} alt="RecycleIT Logo" className="w-24 h-24" />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-gray-700 font-medium text-center px-4"
        >
          {currentFact}
        </motion.p>
      </div>
    </div>
  );
};

export default Preloader;