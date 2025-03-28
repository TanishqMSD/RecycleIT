import { useState } from 'react';
import { motion } from 'framer-motion';

const GameHome = () => {
  const [highScores, setHighScores] = useState([
    { name: 'Player 1', score: 1000 },
    { name: 'Player 2', score: 850 },
    { name: 'Player 3', score: 700 },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-green-800 mb-4">E-Waste Management Game</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn about proper e-waste disposal through fun and interactive gameplay!
          </p>
        </motion.div>

        {/* Game Modes Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">Sorting Challenge</h3>
              <p className="text-gray-600 mb-4">
                Test your knowledge by sorting different electronic devices into their correct
                recycling categories. Learn while you play!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
                onClick={() => window.location.href = '/game/sorting'}
              >
                Play Now
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">Coming Soon</h3>
              <p className="text-gray-600 mb-4">
                More exciting game modes are on the way! Stay tuned for new challenges and
                learning opportunities.
              </p>
              <button
                disabled
                className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scoreboard Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">High Scores</h2>
          <div className="space-y-4">
            {highScores.map((score, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between items-center bg-green-50 p-4 rounded-lg"
              >
                <span className="text-lg font-medium text-gray-700">{score.name}</span>
                <span className="text-lg font-bold text-green-600">{score.score}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GameHome;