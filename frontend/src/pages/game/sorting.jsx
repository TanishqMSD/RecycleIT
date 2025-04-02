import { useState, Suspense, useEffect, useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import gsap from 'gsap';
import { FaMobileAlt, FaLaptop, FaTabletAlt, FaBatteryFull, FaDesktop, FaKeyboard, FaMouse, FaPrint } from 'react-icons/fa';
import { MdRouter, MdCamera, MdMicrowave } from 'react-icons/md';
import { BiRecycle, BiTrash } from 'react-icons/bi';
import { GiCircuitry, GiNuclearWaste } from 'react-icons/gi';

function WasteItem({ item, onDragEnd }) {
  const controls = useDragControls();
  const ref = useRef();

  const iconMap = {
    'Working Laptop': FaLaptop,
    'Circuit Board': GiCircuitry,
    'CRT Monitor': FaDesktop,
    'Broken Plastic Case': BiTrash,
    'Old Smartphone': FaMobileAlt,
    'Dead Battery': FaBatteryFull,
    'Broken Tablet': FaTabletAlt,
    'Old Router': MdRouter
  };

  const Icon = iconMap[item.name];

  return (
    <motion.div
      ref={ref}
      drag
      dragControls={controls}
      dragMomentum={false}
      onDragEnd={(event, info) => onDragEnd(item, info)}
      className="absolute cursor-grab active:cursor-grabbing bg-gray-700 rounded-lg p-4 shadow-lg"
      style={{
        left: `${item.position[0]}%`,
        top: `${item.position[1]}%`,
        width: '120px'
      }}
      whileHover={{ scale: 1.05 }}
      whileDrag={{ scale: 1.1, zIndex: 50 }}
    >
      <div className="flex flex-col items-center gap-2 text-white">
        <Icon className="w-8 h-8" />
        <span className="text-sm font-medium text-center">{item.name}</span>
      </div>
    </motion.div>
  );
}

function RecycleBin({ bin, onDragEnter, onDragLeave }) {
  const iconMap = {
    'Reusable Electronics': FaLaptop,
    'Recyclable E-Waste': BiRecycle,
    'Hazardous E-Waste': GiNuclearWaste,
    'General Trash': BiTrash
  };

  const Icon = iconMap[bin.name];

  return (
    <motion.div
      className="absolute bottom-8 flex flex-col items-center"
      style={{ left: `${bin.position[0]}%` }}
      onHoverStart={onDragEnter}
      onHoverEnd={onDragLeave}
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-white font-bold mb-2 text-center">{bin.name}</div>
      <div
        className="w-32 h-32 rounded-lg shadow-lg flex flex-col items-center justify-center gap-2 transition-colors"
        style={{ backgroundColor: bin.color }}
      >
        <Icon className="w-12 h-12 text-white" />
        <span className="text-white text-sm">{bin.description}</span>
      </div>
    </motion.div>
  );
}

const SortingGame = () => {
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ title: '', description: '' });

  const categories = [
    { id: 'reusable', name: 'Reusable Electronics', color: '#4CAF50', position: [20], description: 'Items that can be refurbished or donated' },
    { id: 'recyclable', name: 'Recyclable E-Waste', color: '#2196F3', position: [40], description: 'Items that can be broken down for materials' },
    { id: 'hazardous', name: 'Hazardous E-Waste', color: '#F44336', position: [60], description: 'Items requiring special disposal' },
    { id: 'general', name: 'General Trash', color: '#9E9E9E', position: [80], description: 'Non-recyclable electronic waste' },
  ];

  const deviceWords = [
    'Smartphone', 'Laptop', 'Tablet', 'Charger', 'Battery', 'Monitor',
    'Keyboard', 'Mouse', 'Printer', 'Router', 'Camera', 'Microwave'
  ];

  const items = [
    { id: 1, name: 'Working Laptop', category: 'reusable', position: [15, 20], points: 100, description: 'Still functional and can be donated' },
    { id: 2, name: 'Circuit Board', category: 'recyclable', position: [35, 20], points: 150, description: 'Contains valuable recyclable materials' },
    { id: 3, name: 'CRT Monitor', category: 'hazardous', position: [55, 20], points: 200, description: 'Contains lead and requires special handling' },
    { id: 4, name: 'Broken Plastic Case', category: 'general', position: [75, 20], points: 50, description: 'Non-recyclable electronic waste' },
    { id: 5, name: 'Old Smartphone', category: 'reusable', position: [15, 40], points: 100, description: 'Can be refurbished or recycled' },
    { id: 6, name: 'Dead Battery', category: 'hazardous', position: [35, 40], points: 150, description: 'Contains harmful chemicals' },
    { id: 7, name: 'Broken Tablet', category: 'recyclable', position: [55, 40], points: 100, description: 'Can be broken down for parts' },
    { id: 8, name: 'Old Router', category: 'general', position: [75, 40], points: 50, description: 'Outdated and non-functional' }
  ];

  const [correctItems, setCorrectItems] = useState([]);

  const handleDragEnd = (item, info) => {
    const binPositions = categories.map(cat => ({
      id: cat.id,
      position: parseInt(cat.position[0])
    }));

    const dragEndX = (info.point.x / window.innerWidth) * 100;
    const dragEndY = info.point.y;
    const bottomThreshold = window.innerHeight - 200;

    if (dragEndY > bottomThreshold) {
      const closestBin = binPositions.reduce((prev, curr) => {
        return Math.abs(curr.position - dragEndX) < Math.abs(prev.position - dragEndX) ? curr : prev;
      });

      const correctBin = categories.find(cat => cat.id === item.category);
      const selectedBin = categories.find(cat => cat.id === closestBin.id);

      if (selectedBin.id === item.category) {
        // Correct bin
        setScore(score + item.points);
        setCorrectItems([...correctItems, item.id]);
        
        // Play success sound
        new Audio('/sounds/success.mp3').play().catch(() => {});

        // Show success message with animation
        gsap.to(`#item-${item.id}`, {
          scale: 1.2,
          opacity: 0,
          y: -50,
          duration: 0.5,
          ease: 'back.in(1.7)',
          onComplete: () => {
            setPopupContent({
              title: 'Correct!',
              description: `Great job! ${item.name} belongs in ${correctBin.name} because ${item.description}.`
            });
            setShowPopup(true);
          }
        });
      } else {
        // Wrong bin
        new Audio('/sounds/error.mp3').play().catch(() => {});
        setScore(Math.max(0, score - 50));

        // Shake animation for wrong placement
        gsap.to(`#item-${item.id}`, {
          x: [-10, 10, -10, 10, 0],
          duration: 0.5,
          ease: 'power1.inOut'
        });

        setPopupContent({
          title: 'Try Again',
          description: `That's not the right bin. ${item.name} should go in ${correctBin.name}.`
        });
        setShowPopup(true);
      }
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimer(60);
    setGameOver(false);
    setShowTutorial(true);

    // Start the countdown timer
    const countdown = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdown);
          setGameOver(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 p-8 rounded-xl shadow-lg text-center max-w-lg"
        >
          <h1 className="text-4xl font-bold text-green-400 mb-4">E-Waste Sorting Challenge</h1>
          <p className="text-gray-300 mb-6">
            Sort electronic waste in our immersive 3D environment.
            Learn about proper e-waste management while having fun!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200"
          >
            Start Game
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gray-900 relative">
      <div className="absolute top-4 left-4 z-10 bg-gray-800 rounded-lg shadow-lg p-4 flex gap-4">
        <h2 className="text-2xl font-bold text-green-400">Score: {score}</h2>
        <h2 className="text-2xl font-bold text-yellow-400">Time: {timer}s</h2>
      </div>

      {showTutorial && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-gray-800 bg-opacity-90 p-8 rounded-xl max-w-lg text-center">
          <h3 className="text-2xl font-bold text-green-400 mb-4">How to Play</h3>
          <p className="text-gray-300 mb-6">Click on e-waste items and sort them into the correct recycling bins. Learn about proper e-waste disposal and earn points!</p>
          <button
            onClick={() => setShowTutorial(false)}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Got it!
          </button>
        </div>
      )}

      {showPopup && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-gray-800 bg-opacity-90 p-6 rounded-xl max-w-md">
          <h3 className="text-xl font-bold text-green-400 mb-2">{popupContent.title}</h3>
          <p className="text-gray-300 mb-4">{popupContent.description}</p>
          <button
            onClick={() => setShowPopup(false)}
            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition-colors"
          >
            Close
          </button>
        </div>
      )}

      {gameOver && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-gray-800 bg-opacity-90 p-8 rounded-xl max-w-lg text-center">
          <h3 className="text-3xl font-bold text-green-400 mb-4">Game Over!</h3>
          <p className="text-2xl text-white mb-4">Final Score: {score}</p>
          <button
            onClick={startGame}
            className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}

      <div className="relative w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden">
          {categories.map((category) => (
            <RecycleBin
              key={category.id}
              position={category.position}
              color={category.color}
              category={category.name}
            />
          ))}

          {items.map((item) => !correctItems.includes(item.id) && (
            <WasteItem
              key={item.id}
              item={item}
              onDragEnd={handleDragEnd}
            />
          ))}
        </div>
    </div>
  );
};

export default SortingGame;