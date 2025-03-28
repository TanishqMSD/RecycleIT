import { useState, Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Stars, Html, useAnimations } from '@react-three/drei';
import { Physics, useBox, usePlane } from '@react-three/cannon';
import { motion } from 'framer-motion';
import gsap from 'gsap';

function Model({ position, rotation, onClick, modelPath, isCorrect }) {
  const { scene } = useGLTF(modelPath);
  const ref = useRef();

  useEffect(() => {
    if (isCorrect) {
      gsap.to(ref.current.position, {
        y: position[1] + 2,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(ref.current.position, {
            y: -5,
            duration: 0.5,
            ease: 'power2.in'
          });
        }
      });
      
      gsap.to(ref.current.rotation, {
        y: rotation[1] + Math.PI * 2,
        duration: 1,
        ease: 'power2.inOut'
      });
    }
  }, [isCorrect]);

  return (
    <primitive
      ref={ref}
      object={scene}
      position={position}
      rotation={rotation}
      onClick={onClick}
      scale={[0.5, 0.5, 0.5]}
    />
  );
}

function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -2, 0],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#303030" />
    </mesh>
  );
}

function RecycleBin({ position, color, category }) {
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
  }));

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[2, 0.5, 2]} />
      <meshStandardMaterial color={color} />
      <Html position={[0, 1, 0]} center>
        <div className="text-white font-bold">{category}</div>
      </Html>
    </mesh>
  );
}

const SortingGame = () => {
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const categories = [
    { id: 'electronics', name: 'Electronics', color: '#4CAF50', position: [-4, 0, 0] },
    { id: 'batteries', name: 'Batteries', color: '#2196F3', position: [0, 0, 0] },
    { id: 'appliances', name: 'Appliances', color: '#F44336', position: [4, 0, 0] },
  ];

  const deviceWords = [
    'Smartphone', 'Laptop', 'Tablet', 'Charger', 'Battery', 'Monitor',
    'Keyboard', 'Mouse', 'Printer', 'Router', 'Camera', 'Microwave'
  ];

  const items = [
    { id: 1, name: 'Smartphone', category: 'electronics', position: [-4, 5, 0], rotation: [0, 0, 0], points: 100 },
    { id: 2, name: 'Laptop Battery', category: 'batteries', position: [0, 5, 0], rotation: [0, Math.PI / 4, 0], points: 150 },
    { id: 3, name: 'Microwave', category: 'appliances', position: [4, 5, 0], rotation: [0, -Math.PI / 4, 0], points: 200 },
  ];

  const [correctItems, setCorrectItems] = useState([]);

  const handleItemClick = (item) => {
    const correctBin = categories.find(cat => cat.id === item.category);
    if (correctBin) {
      setScore(score + item.points);
      setCorrectItems([...correctItems, item.id]);
      
      // Create particle effect
      const particles = Array.from({ length: 20 }).map(() => ({
        position: [item.position[0], item.position[1], item.position[2]],
        velocity: [
          (Math.random() - 0.5) * 5,
          Math.random() * 5,
          (Math.random() - 0.5) * 5
        ]
      }));
      
      // Play success sound
      new Audio('/sounds/success.mp3').play().catch(() => {});
    } else {
      // Play error sound
      new Audio('/sounds/error.mp3').play().catch(() => {});
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
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
    <div className="w-full h-screen bg-gray-900">
      <div className="absolute top-4 left-4 z-10 bg-gray-800 rounded-lg shadow-lg p-4">
        <h2 className="text-2xl font-bold text-green-400">Score: {score}</h2>
      </div>

      <Canvas shadows camera={{ position: [0, 5, 15], fov: 60 }}>
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

          <Physics>
            <Ground />
            
            {categories.map((category) => (
              <RecycleBin
                key={category.id}
                position={category.position}
                color={category.color}
                category={category.name}
              />
            ))}

            {items.map((item) => (
              <Model
                key={item.id}
                position={item.position}
                rotation={item.rotation}
                onClick={() => handleItemClick(item)}
                modelPath={`/models/${item.category}.glb`}
                isCorrect={correctItems.includes(item.id)}
              />
            ))}
          </Physics>

          <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2 - 0.1} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SortingGame;